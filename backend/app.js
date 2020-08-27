require("dotenv").config();
const express= require("express");
const db = require("./api/config/db");
const apiRouter = require("./api/index.route")
const cors = require('cors')
const app = express();

//Setting db connection object on app
app.set("db" , db);


//Middlewres
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api" , apiRouter);


app.listen(process.env.PORT , ()=>{
    console.log("Server is running on port: " , process.env.PORT)
})