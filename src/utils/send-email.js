import dayjs from 'dayjs';
import { emailTemplates } from './email-template.js';
import transporter from '../config/nodemailer.js';
import { EMAIL_ID } from '../config/env.js';

export const sendReminderEmail = async ({ to, type, subscription }) => {
    try {
        if (!to || !type || !subscription) {
            throw new Error('Missing required parameters');
        }

        const template = emailTemplates.find((t) => t.label === type);
        if (!template) {
            throw new Error('Invalid email type');
        }

        const mailInfo = {
            userName: subscription.user?.name || 'User',
            subscriptionName: subscription.name || 'Subscription',
            renewalDate: subscription.renewalDate
                ? dayjs(subscription.renewalDate).format('MMM D, YYYY')
                : 'N/A',
            planName: subscription.name || 'N/A',
            price: subscription.currency && subscription.price
                ? `${subscription.currency} ${subscription.price} (${subscription.frequency || 'N/A'})`
                : 'N/A',
            paymentMethod: subscription.paymentMethod || 'N/A',
        };

        const message = template.generateBody(mailInfo);
        const subject = template.generateSubject(mailInfo);

        const mailOptions = {
            from: EMAIL_ID,
            to,
            subject,
            html: message,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully: ', info.response);
        return info;
    }
    catch (error) {
        console.error('Error sending email:', error.message);
        throw new Error('Failed to send email');
    }
};