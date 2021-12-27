const express = require("express");
const path = require("path");
const app = express();
const hbs = require('hbs');
const port = process.env.PORT || 5000;
require("./db/conn");

// Home Page

const static_path = path.join(__dirname, '../public');
const template_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

app.use(express.static(static_path));
app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerPartials(partials_path);
// app.get( path, callback )

app.get("/", (req,res) => {
    res.render("index");
})

app.get("/register", (req,res) => {
    res.render("register");
})

app.get("/login", (req,res) => {
    res.render("login");
})
// Create Server

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
