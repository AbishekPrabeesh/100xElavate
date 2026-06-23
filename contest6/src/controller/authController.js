const db = require('../db');


function signup(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = db.users.find(u => u.username === username);
    if (userExists) {
        return res.status(401).json({
            message: "user already exists"
        });
    }
    const token = Math.random().toString();

    db.users.push({
        username: username,
        password: password,
        role: 'user',
        token: token,
        purchasedCourses: [],
        walletBalance: 0
    });

    return res.json({
        message: "You are signed up",
        token: token
    });
}


function login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const user = db.users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(403).json({
            message: "Invalid username or password"
        });
    }
    const token = Math.random().toString();
    user.token = token;

    return res.json({
        message: "login successfull",
        token: token
    });
}

module.exports = {
    signup,
    login
};