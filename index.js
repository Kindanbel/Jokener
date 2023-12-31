import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

const Joke_URL = "https://v2.jokeapi.dev"

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))


app.post("/submit", async (req, res)=>{
    const categoryChosen = req.body.categories;
    const langChosen = req.body.language;
    const typeChosen1 = req.body.single;
    const typeChosen2 = req.body.twopart;
    const userName = req.body.name
    try {
        let response = await axios.get(`${Joke_URL}/joke/${categoryChosen}?lang=${langChosen}&type=${typeChosen1}&type=${typeChosen2}`)
        console.log(response.data.type)
        res.render("index.ejs", {
            content: response.data,
            userName: userName,
        })
    } catch (error) {
        res.render("index.ejs", {
            error: error.message
        })
    }
})


app.get("/", (req, res)=>{
    res.render("index.ejs")
})








app.listen(port, (req, res)=>{
    console.log(`Your server is running in port ${port}`);
})