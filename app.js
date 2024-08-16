import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import contactRoutes from "./routes/contacts.js"
import ivrRoutes from "./routes/ivrRoutes.js"




dotenv.config()

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/api", contactRoutes)
app.use("/api", ivrRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is working on PORT:${process.env.PORT}`);
})