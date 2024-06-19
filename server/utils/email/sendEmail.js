import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const sendEmail = ()=>{
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    port: 465,
      secure: true, // use SSL
    auth: {
        user: "readit.noreplay@gmail.com", 
        pass: "tnfd dqhj deov mfvg", 
    },
    tls: {
      rejectUnauthorized: false, // Allow self-signed certificates
    },
  });
  
  let mailOptions = {
    from: 'NoReplay',
    to: 's0504175747@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
       console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
  });
  }

export default sendEmail;
