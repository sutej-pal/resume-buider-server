const User = require("../models/user");
const MD5 = require("md5");
const mail = require("../mails/mail");
const { response400, response403 } = require("../helpers/response.helper");
const { v4: uuid } = require("uuid");
const moment = require("moment");
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require("../helpers/auth.helper");
const UserResource = require("../resources/user.resource");
const sms = require("../sms/sms");


module.exports = class MobileAuthController {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async registerMobile(req, res) {

        const { name, countryCode, mobile, password } = req.body;

        // check if user already exists
        const existingUser = await User.findOne({
            mobile
        });

        let user = null;
        const otp = Math.floor(Math.random() * 9000) + 1000;

        // if existing user
        if (existingUser) {
            if (existingUser.isMobileVerified) {
                return response400(res, "User exists");
            }
            // update otp
            user = existingUser;
            user.otp = otp;
            await user.save();
        } else {
            // create user account
            user = await User.create({
                name,
                countryCode,
                mobile,
                otp,
                password,
            });
        }

        // send mail
        await sms()
            .to(countryCode + "" + mobile)
            .text("Hi, your otp for login is " + user.otp)
            .send();

        return res.json({
            message: "User account created, check phone",
            user: new UserResource(user)
        });
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async verifyMobile(req, res) {

        const { mobile, otp } = req.body;

        // check if user already exists
        const user = await User.findOne({
            mobile,
        });
        if (!user) {
            return response400(res, "User not found");
        }

        // check if user verified
        if (user.isMobileVerified) {
            return response400(res, "Mobile already verified");
        }

        // verify token
        if (user.otp != otp) {
            return response400(res, "Invalid otp");
        }

        // verification successful
        user.isMobileVerified = true;
        user.otp = null;
        await user.save();

        return res.json({
            message: "Mobile verified, please login"
        });
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async loginMobile(req, res) {

        const { mobile, password } = req.body;

        // check if user already exists
        const user = await User.findOne({
            mobile,
        });
        if (!user) {
            return response400(res, "User not found");
        }

        // check if user verified
        if (!user.isMobileVerified) {
            return response403(res, "Mobile not verified");
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