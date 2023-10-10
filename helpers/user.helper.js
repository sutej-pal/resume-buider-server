const User = require("../models/user");
const jwt = require('jsonwebtoken');

async function createUser({
    email,
    countryCode,
    mobile,
    password,
    isEmailVerified,
    isMobileVerified,
    role,
}) {
    return User.create({
        email,
        countryCode,
        mobile,
        password,
        isEmailVerified,
        isMobileVerified,
        role,
    });
}

async function generateTokenForUser(user) {
    return jwt.sign(user.toObject(), process.env.APP_KEY);
}

module.exports = {
    createUser,
    generateTokenForUser,
};