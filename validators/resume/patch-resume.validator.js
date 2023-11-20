const Validator = require('../validator');

module.exports = class PatchResumeValidator extends Validator {

    constructor(data = {}, rules = {}, messages = {}) {
        /**
         * Define You rules here
         */
        rules = {
            id: "required|mongoid",
            position: 'string',
            profile: 'string'
        };

        super(data, rules, messages);
    }

    /**
     * 
     * Static function that validates a incoming request as a middleware
     * 
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.Next} next 
     */
    static middleware(req, res, next) {
        const validator = new PatchResumeValidator(req.body);
        // check if data is valid
        if (validator.fails()) {
            // return error in case data invalid
            return res.status(422).json(validator.errors());
        } else {
            // set validated values a req.body
            req.body = { ...validator.validated };
            // continue with next middleware
            next();
        }
    }
}