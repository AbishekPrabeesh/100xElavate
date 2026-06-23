const db = require('./db');

function userMiddleware(req, res, next) {
    const token = req.headers.token;
    const user = db.users.find(u => u.token === token);

    if (!user) {
        return res.status(403).json({ message: "Unauthorized! Please log in." });
    }

    req.user = user;
    next();
}

module.exports = {
    userMiddleware
};
