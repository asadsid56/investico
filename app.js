const express = require("express");
const path = require("path");
const app = express();
const hbs = require('hbs');
const port = process.env.PORT || 5000;
require("./db/conn");
const Register = require("./models/userRegisters");
const message = require("./models/message");
const nodemailer = require("nodemailer");

// Home Page

const static_path = path.join(__dirname, '../public');
const template_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

// use json format
app.use(express.json()); 
app.use(express.urlencoded({extended: false}));
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

app.get("/emploi", (req,res) => {
    res.render("emploi");
})

app.get("/condition", (req,res) => {
    res.render("condition");
})

app.get("*", (req,res) => {
    res.render("404");
})



// User Registration 

app.post("/register", async (req,res) => {

    let uuid;

    const create_UUID = () => {
        let dt = new Date().getTime();
        uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        // return uuid; 
    }
    
    console.log(create_UUID());


   try {
       const password = req.body.password;
       const confirmPassword = req.body.confirmPassword;

        if( password === confirmPassword) {
            
            const registration = new Register({
                userID : uuid,
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                email : req.body.email,
                phoneNumber : req.body.phoneNumber,
                gender : req.body.gender,
                age : req.body.age,
                Address : req.body.Address,
                City : req.body.City,
                CodePostal : req.body.CodePostal,
                password : req.body.password,
                confirmPassword : req.body.confirmPassword,
                file : req.body.file
            });

        const registeredSave = await registration.save();
        res.status(201).render("index");

        } else {
            res.send("Invalid credientials")
        }

   } catch (error) {
       res.status(400).send(error);
   }

   const emiilOutput = `
        <p>You have a new contact message</p>
        <h3>Contact Details</h3>
        <ul>
            <li>User_ID: ${uuid}</li>
            <li>First Name: ${req.body.firstName} </li>
            <li>Last Name: ${req.body.lastName} </li>
            <li>GSM: ${req.body.phoneNumber} </li>
            <li>Sexe: ${req.body.gender} </li>
            <li>Age: ${req.body.age} </li>
            <li>Address: ${req.body.Address} </li>
            <li>City: ${req.body.City} </li>
            <li>CodePostal: ${req.body.CodePostal} </li>
        </ul>
        <h3>Visit our website</h3>
        <a></a>`;

        let transporter = nodemailer.createTransport({
            service: 'outlook',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "admin@investigo.live", // generated ethereal user
                pass: "investigo123@"     // generated ethereal password
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        
         // send mail with defined transport object
         let info = await transporter.sendMail({
            from: 'info@investigo.live', // sender address
            to: `${req.body.email} , info@investigo.live`, // list of receivers
            subject: "Your Contact Details ✔", // Subject line
            text: "Hello world?", // plain text body
            html: emiilOutput // html body
          });
        
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        
          res.render("Email has been sent");

});


// User Messages or Questions

app.post("/index", async (req,res) => {

   console.log(req.body);

    try {
        const messages = new message({

            fullName : req.body.fullName,
            email : req.body.email,
            message : req.body.message,
        });

    const messageSave = await messages.save();
    res.status(201).render("index");

    } catch (error) {
        res.status(400).send(error);
    }

});

   

// Create Server

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
