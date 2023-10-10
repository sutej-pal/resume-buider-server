const MailProviderSMTP = require("./providers/smtp.mail-provider");

module.exports = function mail() {
    const providerName = process.env.MAIL_PROVIDER;
    switch (providerName) {
        case "smtp":
        default:
            return new MailProviderSMTP();
    }
}


class Mail {
    constructor() {
        const providerName = process.env.MAIL_PROVIDER;
        switch (providerName) {
            case "smtp":
            default:
                this.provider = new MailProviderSMTP();
        }
    }


    to(toAddress) {
        this.provider.to(toAddress);
        return this;
    }

    from(fromAddress) {
        this.provider.from(fromAddress);
        return this;
    }

    subject(mailSubject) {
        this.provider.subject(mailSubject);
        return this;
    }

    /**
     * Set both html and text
     * @param {*} mailBody 
     */
    body(mailBody) {
        this.provider.body(mailBody);
        return this;
    }

    /**
     * Set only text (html if necessary)
     * @param {*} mailBody 
     */
    text(mailBody) {
        this.provider.text(mailBody);
        return this;
    }
    /**
     * Set only html (text if necessary)
     * @param {*} mailBody 
     */
    html(mailBody) {
        this.provider.html(mailBody);
        return this;
    }

    send() {
        return this.provider.send();
    }
}