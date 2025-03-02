import nodemailer from 'nodemailer';
import { EMAIL_PASSWORD, EMAIL_ID } from "./env.js";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_ID,
        pass: EMAIL_PASSWORD
    }
})

export default transporter;