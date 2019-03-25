const jwt = require('./token');

let headerTokenVerifier = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({
            message: "Access Forbidden!",
            data: ""
        });
    }

    let token = req.headers.authorization.split(' ')[1];

    jwt.verifyToken(token).then(() => {
        return next();
    }).catch((error) => {
        return res.status(403).json({
            message: "Access Forbidden!",
            data: ""
        });
    });
};

module.exports = headerTokenVerifier;