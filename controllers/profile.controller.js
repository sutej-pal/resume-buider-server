const UserResource = require("../resources/user.resource")

module.exports = class ProfileController {
    static async getProfile(req, res) {
        return res.json({
            user: new UserResource(req.user)
        });
    }
}