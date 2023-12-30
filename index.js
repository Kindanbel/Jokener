import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}))


app.get("/", (req, res)=>{
    res.render("index.ejs")
})








app.listen(port, (req, res)=>{
    console.log(`Your server is running in port ${port}`);
})