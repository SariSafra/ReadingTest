import sendEmail from '../utils/email/sendEmail.js'; // Adjust the path as needed

export const sendEmailService = async (to, subject, payload, templateName) => {
    try {
        await sendEmail(to, subject, payload, templateName);
    } catch (error) {
        throw new Error('Failed to send email');
    }
};
