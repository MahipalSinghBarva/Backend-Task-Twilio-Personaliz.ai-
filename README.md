Interactly Backend Developer Coding Task
Introduction
This repository contains the completed backend developer coding task for Interactly. The task involves two key parts:

A CRUD (Create, Read, Update, Delete) application using Node.js, Express.js, and MySQL, with integration into FreshSales CRM.
A Twilio IVR system that sends a personalized voice message and sends an interview link via SMS upon user input.
Task 1: CRUD Application with FreshSales CRM Integration
Overview
This application allows you to create, retrieve, update, and delete contacts in both FreshSales CRM and a MySQL database. The user can specify whether to store the contact in the CRM or the database using the data_store parameter.

Tech Stack
Node.js
Express.js
MySQL
FreshSales CRM API
Axios (for API requests)
Endpoints
Create Contact

POST /api/createContact
Parameters: first_name, last_name, email, mobile_number, data_store
Stores the contact in either FreshSales CRM or MySQL, based on the value of data_store.
Retrieve Contact

POST /api/getContact
Parameters: contact_id, data_store
Retrieves the contact from either FreshSales CRM or MySQL.
Update Contact

POST /api/updateContact
Parameters: contact_id, new_email, new_mobile_number, data_store
Updates the contact in either FreshSales CRM or MySQL.
Delete Contact

POST /api/deleteContact
Parameters: contact_id, data_store
Deletes the contact from either FreshSales CRM or MySQL.

Database
The application uses MySQL as the database, and the contacts table stores the contact information when data_store is set to DATABASE.
The schema for the contacts table:
sql
Copy code
CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    mobile_number VARCHAR(20)
);

Task 2: Twilio IVR System
Overview
The Twilio IVR system sends a personalized voice call to the specified phone number. During the call, the user is asked to press 1 if they are interested in receiving an interview link. Upon pressing 1, an SMS is sent with the interview link.

How It Works
The Twilio API is used to send the call and handle keypresses.
The call plays a pre-recorded audio message and prompts the user to press 1.
If the user presses 1, Twilio sends an SMS with the interview link.
How to Run the IVR System
Deploy the Application

Deploy the Node.js app to a public hosting service (e.g., Heroku).
Update the Twilio call URL to point to your deployed /api/callivr endpoint.
Trigger the IVR Call

Make a POST request to /api/schedule-call to initiate the IVR call.
Demo Video
Link to Demo Video
Screenshots
Postman Collection Screenshots: Screenshots of the working endpoints tested in Postman.
Conclusion
This repository completes the two tasks as outlined in the Interactly Backend Developer Coding Task. The application integrates with both FreshSales CRM and Twilio's API, fulfilling the required functionalities.

If you have any questions, feel free to reach out!

Author
Mahipal Singh Barva

Email: mahipalsingh450@gmail.com
GitHub: MahipalSinghBarva
