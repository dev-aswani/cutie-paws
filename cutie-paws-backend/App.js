// This file is the main entry point of a Node.js application. configures middleware, initializes the database, defines routes using a router module, and starts the server to listen for incoming requests on the specified port.
const express =require("express");
const dotenv =require("dotenv");
const bodyParser =require("body-parser");
const cors = require("cors")
const morgan =require("morgan");
const router=require("./routes/Api");
dotenv.config();
const mysql=require("mysql");
const {databaseInit} = require("./databaseInit");

const app=express();
const port =process.env.PORT||8080;

//database

databaseInit();

//middleware
app.use(cors())
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/",router);

// setting up the app to listen on a specific port
app.listen(port, ()=>console.log(`app listening on port ${port}`));

