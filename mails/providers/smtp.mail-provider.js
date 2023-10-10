const nodemailer = require('nodemailer');

module.exports = class MailProviderSMTP {
    constructor() {
        // configure
        this.fromAddress = process.env.MAIL_FROM;

        // create reusable transporter object using the default SMTP transport
        this.transporter = nodemailer.createTransport({
            port: process.env.MAIL_PORT,               // true for 465, false for other ports
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            secure: process.env.MAIL_SECURE,
        });
    }

    to(toAddress) {
        this.toAddress = toAddress;
        return this;
    }

    from(fromAddress) {
        this.fromAddress = fromAddress;
        return this;
    }

    subject(mailSubject) {
        this.mailSubject = mailSubject;
        return this;
    }

    /**
     * Set both html and text
     * @param {*} mailBody 
     */
    body(mailBody) {
        this.mailText = mailBody;
        this.mailHTML = mailBody;
        return this;
    }

    /**
     * Set only text (html if necessary)
     * @param {*} mailBody 
     */
    text(mailBody) {
        this.mailText = mailBody;
        if (!this.mailHTML) {
            this.mailHTML = mailBody;
        }
        return this;
    }
    /**
     * Set only html (text if necessary)
     * @param {*} mailBody 
     */
    html(mailBody) {
        this.mailHTML = mailBody;
        if (!this.mailText) {
            this.mailText = mailBody;
        }
        return this;
    }

    send() {
        const mailOptions = {
            from: this.fromAddress,
            to: this.toAddress,   // list of receivers
            subject: this.mailSubject,
            text: this.mailText,
            html: this.mailHTML,
        };
        // send functionality
        return this.transporter.sendMail(mailOptions);
    }
}