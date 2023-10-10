const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    name: String,
    email: String,
    countryCode: {
        default: "+91",
        type: String,
    },
    mobile: String,
    password: String,
    dob: String,
    nationality: String,
    role: {
        type: String,
        required: false,
        default: "user"
    }, // can be admin, user
    isEmailVerified: {
        type: Boolean,
        required: false,
        default: false,
    },
    isMobileVerified: {
        type: Boolean,
        required: false,
        default: false,
    },
    otp: Number,
    emailVerificationToken: String,
    emailVerificationTokenExpiresAt: Date,
    lastLoginDate: Date,
}, {
    timestamps: true,
});

const User = mongoose.model("User", Schema);

module.exports = User;