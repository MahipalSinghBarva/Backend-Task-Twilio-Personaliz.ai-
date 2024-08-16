import axios from 'axios';
import dotenv from "dotenv"
import { validationResult } from 'express-validator';


import connection from '../models/db.js';

dotenv.config()


const FRESHSALES_API_URL = process.env.FRESHSALES_API_URL || "https://mahienterpricess-team.myfreshworks.com/crm/sales/api/contacts"
;
const FRESHSALES_API_KEY = process.env.FRESHSALES_API_KEY;

export const createContact = async (req, res) => {
    const { first_name, last_name, email, mobile_number, data_store } = req.body;

    if (!first_name || !last_name || !email || !mobile_number || !data_store) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        if (data_store === 'CRM') {
            console.log('Sending request to FreshSales:', {
                contact: { first_name, last_name, email, mobile_number }
            });

            const response = await axios.post(FRESHSALES_API_URL, {
                contact: { first_name, last_name, email, mobile_number }
            }, {
                headers: {
                    Authorization: `Token token=${FRESHSALES_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });

            res.status(201).json(response.data);
        } else if (data_store === 'DATABASE') {
            const query = `INSERT INTO contacts (first_name, last_name, email, mobile_number) VALUES (?, ?, ?, ?)`;
            connection.query(query, [first_name, last_name, email, mobile_number], (err, results) => {
                if (err) {
                    console.error("Error inserting contact into database:", err);
                    return res.status(500).json({ message: "Database error" });
                }
                res.status(201).json({ message: "Contact created successfully", id: results.insertId });
            });
        } else {
            res.status(400).json({ message: "Invalid data_store value. Must be 'CRM' or 'DATABASE'." });
        }
    } catch (error) {
        console.error("Error creating contact in FreshSales:", error.response ? error.response.data : error.message);
        res.status(500).json({ message: "Error creating contact in CRM", details: error.response ? error.response.data : error.message });
    }
};

export const getContact = (req, res) => {
    const { contact_id, data_store } = req.body;

    if (!contact_id || !data_store) {
        return res.status(400).json({ message: "Contact ID and data store are required" });
    }

    if (data_store === 'CRM') {
        axios.get(`${FRESHSALES_API_URL}/${contact_id}`, {
            headers: {
                Authorization: `Token token=${FRESHSALES_API_KEY}`
            }
        })
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            console.error("Error fetching contact from FreshSales:", error);
            res.status(500).json({ message: "Error fetching contact from CRM" });
        });
    } else if (data_store === 'DATABASE') {
        const query = `SELECT * FROM contacts WHERE id = ?`;
        connection.query(query, [contact_id], (err, results) => {
            if (err) {
                console.error("Error fetching contact from database:", err);
                return res.status(500).json({ message: "Database error" });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: "Contact not found" });
            }
            res.status(200).json(results[0]);
        });
    }
};

export const updateContact = (req, res) => {
    const { contact_id, new_email, new_mobile_number, data_store } = req.body;

    if (!contact_id || !new_email || !new_mobile_number || !data_store) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (data_store === 'CRM') {
        axios.put(`${FRESHSALES_API_URL}/${contact_id}`, {
            contact: { email: new_email, mobile_number: new_mobile_number }
        }, {
            headers: {
                Authorization: `Token token=${FRESHSALES_API_KEY}`
            }
        })
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => {
            console.error("Error updating contact in FreshSales:", error);
            res.status(500).json({ message: "Error updating contact in CRM" });
        });
    } else if (data_store === 'DATABASE') {
        const query = `UPDATE contacts SET email = ?, mobile_number = ? WHERE id = ?`;
        connection.query(query, [new_email, new_mobile_number, contact_id], (err, results) => {
            if (err) {
                console.error("Error updating contact in database:", err);
                return res.status(500).json({ message: "Database error" });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Contact not found" });
            }
            res.status(200).json({ message: "Contact updated successfully" });
        });
    }
};

export const deleteContact = (req, res) => {
    const { contact_id, data_store } = req.body;

    if (!contact_id || !data_store) {
        return res.status(400).json({ message: "Contact ID and data store are required" });
    }

    if (data_store === 'CRM') {
        axios.delete(`${FRESHSALES_API_URL}/${contact_id}`, {
            headers: {
                Authorization: `Token token=${FRESHSALES_API_KEY}`
            }
        })
        .then(response => {
            res.status(200).json({ message: "Contact deleted from CRM successfully" });
        })
        .catch(error => {
            console.error("Error deleting contact from FreshSales:", error);
            res.status(500).json({ message: "Error deleting contact from CRM" });
        });
    } else if (data_store === 'DATABASE') {
        const query = `DELETE FROM contacts WHERE id = ?`;
        connection.query(query, [contact_id], (err, results) => {
            if (err) {
                console.error("Error deleting contact from database:", err);
                return res.status(500).json({ message: "Database error" });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Contact not found" });
            }
            res.status(200).json({ message: "Contact deleted from database successfully" });
        });
    }
};
