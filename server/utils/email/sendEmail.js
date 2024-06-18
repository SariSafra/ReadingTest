import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// const sendEmail = (to, subject, payload, templatePath) => {
//   const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//     tls: {
//       rejectUnauthorized: false, // Ignore self-signed certificate errors
//     },
//   });

//   // Resolve the template path
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filename);
//   const templateDir = path.join(__dirname, '../../template');
//   const fullTemplatePath = path.join(templateDir, path.basename(templatePath));

//   // Read and compile the template
//   const source = fs.readFileSync(fullTemplatePath, 'utf8');
//   const template = handlebars.compile(source);
//   const html = template(payload);

//   const mailOptions = {
//     from: process.env.FROM_EMAIL,
//     to,
//     subject,
//     html,
//   };

//   transporter.sendMail(mailOptions, (err, info) => {
//     if (err) console.log(err);
//     else console.log(`Email sent: ${info.response}`);
//   });
// };
// const sendEmail = ()=>{
//   let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     port: 465,
//       secure: true, // use SSL
//     auth: {
//         user: "readit.noreplay@gmail.com", 
//         pass: "tnfd dqhj deov mfvg", 
//     },
//     tls: {
//       rejectUnauthorized: false, // Allow self-signed certificates
//     },
//   });
//   let mailOptions = {
//     from: 'noReplay',
//     to: 'c0556787069@gmail.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
//   };
  
//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//        console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
//   });
//   }
const sendEmail = (to, subject, payload, templatePath) => {
//   const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true, // true for 465, false for other ports
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

  let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        port: 465,
          secure: true, // use SSL
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false, // Allow self-signed certificates
        },
      });

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const templateDir = path.join(__dirname, '../../template');
  const fullTemplatePath = path.join(templateDir, path.basename(templatePath));

  const source = fs.readFileSync(fullTemplatePath, 'utf8');
  const template = handlebars.compile(source);
  const html = template(payload);

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to,
    subject,
    text: 'This is a text version of the email.',
    html: html, // HTML version of the email
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};
export default sendEmail;
