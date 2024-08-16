import express from "express";
import {createContact, getContact, updateContact, deleteContact} from "../controllers/contactController.js"

const router = express.Router()

router.post("/createContact", createContact)
router.get('/getContact', getContact);
router.post('/updateContact', updateContact);
router.delete('/deleteContact', deleteContact);

export default router