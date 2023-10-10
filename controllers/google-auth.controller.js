const { response400 } = require("../helpers/response.helper");
const { createUser, generateTokenForUser } = require("../helpers/user.helper");
const UserResource = require("../resources/user.resource");

module.exports = class GoogleAuthController {
    static async invoke(req, res) {
        // get the authorization header
        const { authorization } = req.headers;

        // if no authorization header is present, handle it
        if (!authorization) {
            return response400(res, "Bearer token missing");
        }

        // seperate our token from header
        const [bearer, token] = authorization.split(" ");

        // if token isnt present, handle it
        if (!token) {
            return response400(res, "Bearer token missing");
        }

        // try fetching the user from 
        let result = null;

        // create oauth client
        const { google } = require("googleapis");
        const { OAuth2 } = google.auth;
        const auth2Client = new OAuth2(
            process.env.GOOGLE_OAUTH_CLIENT_ID,
            process.env.GOOGLE_OAUTH_CLIENT_SECRET
        );
        auth2Client.setCredentials({
            access_token: token
        }); // access token
        const oauth2 = google.oauth2({
            auth: auth2Client,
            version: "v2"
        });

        try {

            // get user info
            const data = await oauth2.userinfo.get();

            const { data: userInfo } = data;

            // get user matching the google email
            let user = await User.findOne({ email: userInfo.email });

            // if user is not in the system, create one
            if (!user) {
                user = await createUser({
                    name: userInfo.name,
                    email: userInfo.email,
                    password: "Google Login", // no password required for now
                    isVerified: true, // verified from google
                    role: "user",
                });
            }

            // check if profile picture is missing
            // if (!user.picture) {
            //     user.picture = "user_" + parseInt(Math.random() * 7) + ".png";
            // }

            // set now as last time user logged in
            user.lastLoginDate = moment();

            const token = await generateTokenForUser(user);

            await user.save();

            // generate token for user
            let userResource = user.toObject();
            userResource.token = await jwt.sign(userResource, process.env.APP_KEY);

            return res.json({
                message: "Login successful",
                user: new UserResource(user),
                token
            });

        } catch (error) {
            return response400(res, "Could not authenticate", { reason: error.message });
        }
    }
}
