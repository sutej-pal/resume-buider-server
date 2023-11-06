const User = require("../models/user");
const MD5 = require("md5");
const Mail = require("../mails/mail");
const mail = require("../mails/mail");
const { response400, response403 } = require("../helpers/response.helper");
const { v4: uuid } = require("uuid");
const moment = require("moment");
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require("../helpers/auth.helper");
const UserResource = require("../resources/user.resource");


module.exports = class EmailAuthController {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async registerEmail(req, res) {

        const { name, email, password } = req.body;

        // check if user already exists
        const existingUser = await User.findOne({
            email,
        });
        let user = null;
        const emailVerificationTokenUUID = uuid();
        const emailVerificationToken = emailVerificationTokenUUID + MD5(email + emailVerificationTokenUUID);

        // if existing user 
        if (existingUser) {
            if (existingUser.isEmailVerified) {
                return response400(res, "User exists");
            }
            user = existingUser;
            // update token
            user.emailVerificationToken = emailVerificationToken;
            await user.save();
        } else {
            // create user account
            user = await User.create({
                name,
                email,
                password: hashPassword(password),
                emailVerificationToken,
            });
        }

        // send mail
        // await mail()
        //     .to(email)
        //     .subject("Verify your account")
        //     .body(`<a href="http://localhost:5173/verify-email?token=${user.emailVerificationToken}&email=${user.email}">Click here</a>`)
        //     .send();

        return res.json({
            message: "User account created",
            user: new UserResource(user)
        });
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async verifyEmail(req, res) {

        const { email, token } = req.body;

        // check if user already exists
        const user = await User.findOne({
            email,
        });
        if (!user) {
            return response400(res, "User not found");
        }

        // check if user verified
        if (user.isEmailVerified) {
            return response400(res, "Email already verified");
        }

        // verify token
        if (user.emailVerificationToken !== token) {
            return response400(res, "Invalid verification token");
        }

        // verification successful
        user.isEmailVerified = true;
        user.emailVerificationToken = null;
        user.emailVerificationTokenExpiresAt = null;
        await user.save();

        return res.json({
            message: "Email verified, please login"
        });
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async loginEmail(req, res) {

        const { email, password } = req.body;

        // check if user already exists
        const user = await User.findOne({
            email,
        });
        if (!user) {
            return response400(res, "User not found");
        }

        // check if user verified
        if (!user.isEmailVerified) {
            return response403(res, "Email not verified");
        }

        // verify password
        if (!comparePassword(password, user.password)) {
            return response400(res, "Incorrect password");
        }

        // generate user token
        const token = await jwt.sign(user.toObject(), process.env.APP_KEY);

        return res.json({
            message: "Login successful",
            user: new UserResource(user),
            token
        });
    }
}