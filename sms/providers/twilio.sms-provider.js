const twilio = require('twilio');

module.exports = class SMSProviderTwilio {
    constructor() { }

    to(toAddress) {
        this.toAddress = toAddress;
        return this;
    }

    text(messageBody) {
        this.messageBody = messageBody;
        return this;
    }

    /**
     * Initialize the client and send the message
     */
    async send() {
        if (process.env.APP_ENV === "test") return;

        try {
            const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
            const message = await client.messages.create({
                body: this.messageBody,
                to: this.toAddress,
                from: process.env.TWILIO_NUMBER
            });
            return message;
        } catch (error) {
            console.log("Could not send SMS", {
                error
            })
            return error;
        }
    }
}