import { sendEmailService } from '../services/emailService.js';

export const sendEmailController = async (req, res) => {
    const { to, subject, payload, templatePath } = req.body;
    console.log(req.body);
    try {
        await sendEmailService(to, subject, payload, templatePath);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        res.status(500).send('Failed to send email');
    }
};
