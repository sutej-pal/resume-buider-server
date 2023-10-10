const Resource = require('./resource');

module.exports = class UserResource extends Resource {

    format(resource) {
        return {
            id: resource._id,
            name: resource.name,
            email: resource.email,
            mobile: resource.mobile,
            role: resource.role,
            isEmailVerified: resource.isEmailVerified,
            // emailVerificationToken: resource.emailVerificationToken,
            createdAt: resource.createdAt,
            updatedAt: resource.updatedAt,
        };
    }

}