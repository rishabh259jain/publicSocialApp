const {
    AuthorizationError,
    OperationalError
} = require('../utils/errors');

const authorise = () => async (req, res, next) => {
    let users = req.decoded.user;
    if (!users) return next(new OperationalError('Something went wrong'));
    if (!users.isAdmin) {
        return next(new AuthorizationError('Something went wrong'));
    }
    return next();
}

exports = module.exports = {
    authorise
}