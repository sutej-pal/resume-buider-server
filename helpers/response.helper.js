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
    },
    response404: (res, message = "Not found!", rest = {}) => {
        return res.status(404).json({
            message,
            ...rest
        });
    },
    response422: (res, message = "Some validation error occurred!", rest = {}) => {
        return res.status(400).json({
            message,
            ...rest
        });
    },
}