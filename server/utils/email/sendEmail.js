import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const sendEmail = (to, subject, payload, templatePath) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // Ignore self-signed certificate errors
    },
  });

  // Resolve the template path
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const templateDir = path.join(__dirname, '../../template');
  const fullTemplatePath = path.join(templateDir, path.basename(templatePath));

  // Read and compile the template
  const source = fs.readFileSync(fullTemplatePath, 'utf8');
  const template = handlebars.compile(source);
  const html = template(payload);

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
