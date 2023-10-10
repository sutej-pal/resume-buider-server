module.exports = {
    response400: (res, message = "Bad request!", rest = {}) => {
        return res.status(400).json({
            message,
            ...rest
        });
    },
    response403: (res, message = "Forbidden!", rest = {}) => {
        return res.status(400).json({
            message,
            ...rest
        });
    }
}