import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'handlebars';

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendEmail = async (to, subject, payload, templatePath) => {
  const source = fs.readFileSync(path.join(__dirname, templatePath), 'utf8');
  const compiledTemplate = handlebars.compile(source);
  const html = compiledTemplate(payload);

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to,
    subject,
    html,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
    else console.log(`Email sent: ${info.response}`);
  });
};

export default sendEmail;
