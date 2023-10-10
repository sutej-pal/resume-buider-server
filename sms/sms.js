const SMSProviderTwilio = require("./providers/twilio.sms-provider");

module.exports = function sms() {
    const providerName = process.env.SMS_PROVIDER;
    switch (providerName) {
        case "twilio":
        default:
            return new SMSProviderTwilio();
    }
}
