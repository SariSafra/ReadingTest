import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const sendEmail = async (to, subject, payload, templatePath) => {
  console.log("in send email email: " + to);

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
    logger: true, // Enable logging
    debug: true,  // Show debug output
  });

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const templateDir = path.join(__dirname, '../template');
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

  let info = await transporter.sendMail(mailOptions);

  if (info.accepted.length === 0) {
    throw new Error('Email not accepted by any recipient.');
  }

  console.log(`Email sent: ${info.response}`);
};

export default sendEmail;
