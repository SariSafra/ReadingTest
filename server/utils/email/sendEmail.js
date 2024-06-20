import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const sendEmail = async (to, subject, payload, templatePath) => {
  try {
    console.log("in sendEmail, email: " + to);

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
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

    if (!fs.existsSync(fullTemplatePath)) {
      throw new Error(`Template file not found: ${fullTemplatePath}`);
    }

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

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(`Error sending email: ${err.message}`);
          reject(err);
        } else {
          console.log(`Email sent: ${info.response}`);
          resolve(info);
        }
      });
    });
  } catch (error) {
    console.error(`Error in sendEmail function: ${error.message}`);
    throw error;
  }
};

export default sendEmail;
