import express, { response } from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

const Joke_URL = "https://v2.jokeapi.dev"

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))



//Working on the home page on the server

app.get("/", (req, res)=>{
    res.render("index.ejs")
})


app.post("/submit", async (req, res)=>{
    const categoryChosen = req.body.categories;
    const langChosen = req.body.language;
    const typeChosen1 = req.body.single;
    const typeChosen2 = req.body.twopart;
    const userName = req.body.name
    try {
        let response = await axios.get(`${Joke_URL}/joke/${categoryChosen}?lang=${langChosen}&type=${typeChosen1}`)
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

app.post("/submit", async (req, res)=>{
    const categoryChosen = req.body.categories;
    const langChosen = req.body.language;
    const typeChosen1 = req.body.single;
    const typeChosen2 = req.body.twopart;
    const userName = req.body.name
    try {
        let response = await axios.get(`${Joke_URL}/joke/${categoryChosen}?lang=${langChosen}&type=${typeChosen2}`)
        res.render("index.ejs", {
            content: response.data,
            userName: userName,
        })
    } catch (error) {
        res.render("index.ejs", {
            error: `Your request could not be handled, please try again`,
            error2: error.message
        })
    }
})

//Working on the create page

app.get("/seejokes", (req, res)=>{
    res.render("seejokes.ejs")
})

app.post("/get-id", async (req, res)=>{
    const idChosen = req.body.id
    const categoryChosen = req.body.categories
    const typeChosen = req.body.typechoose
    try {
        const response = await axios.get(`${Joke_URL}/joke/${categoryChosen}?idRange=${idChosen}&type=${typeChosen}`)
        res.render("seejokes.ejs", {
            content: response.data
        })
    } catch (error) {
        res.render("seejokes.ejs", {
            error: "No Matching Joke Found"
        })
    }
    
})








app.listen(port, (req, res)=>{
    console.log(`Your server is running in port ${port}`);
})