const db = require('../db');

function getMe(req, res) {
    return res.json({
        username: req.user.username,
        walletBalance: req.user.walletBalance,
        purchasedCourses: req.user.purchasedCourses
    });
}

function addFunds(req, res) {
    const amount = req.body.amount;
    req.user.walletBalance = req.user.walletBalance + amount;

    return res.json({
        message: "Funds added successfully",
        walletBalance: req.user.walletBalance
    })
}

function getCourses(req, res) {
    const availableCourses = db.courses.filter(c => c.published === true);

    return res.json({
        message: availableCourses
    });
}

module.exports = {
    getMe,
    addFunds,
    getCourses
};
