//     const emiilOutput = `
//     <p>You have a new contact message</p>
// <h3>Contact Details</h3>
// <ul>
//     <li>Full Name: ${req.body.fullName} </li>
//     <li>Email: ${req.body.email} </li>
// </ul>
// <h3>Message</h3>
// <p> ${req.body.message} </p>`;


// let transporter = nodemailer.createTransport({
//     service: 'outlook',
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: "info@investigo.live", // generated ethereal user
//         pass: "asad7410"     // generated ethereal password
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// });

//  // send mail with defined transport object
//  let info = await transporter.sendMail({
//     from: 'info@investigo.live', // sender address
//     to: `${req.body.email} , info@investigo.live`, // list of receivers
//     subject: "Your Contact Details ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: emiilOutput // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

//   res.render({msg: "Email has been sent"});
