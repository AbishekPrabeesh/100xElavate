const jwt = require("jsonwebtoken");
const { SignupSchema, SigninSchema } = require("../types/types");
const { pool } = require("../db");


async function signup(req, res) {
    const { success, data } = SignupSchema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Incorrect inputs"
        })
    }

    const userExistsResponse = await pool.query("SELECT * FROM users WHERE username = $1", [data.username]);

    if (userExistsResponse.rows.length != 0) {
        return res.status(401).json({
            message: "User with this username already exists"
        })
    }
    const response = await pool.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id;", [data.username, data.password]);

    res.json({
        message: "user created"
    })

}

async function signin(req, res) {
    const { data, success } = SigninSchema.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const userExistsResponse = await pool.query("SELECT * FROM users WHERE username = $1 AND password = $2", [data.username, data.password]);
    if (userExistsResponse.rows.length === 0) {
        return res.status(403).json({
            message: "Incorrect credentials"
        })
    }

    const token = jwt.sign({
        userId: userExistsResponse.rows[0].id
    },
        process.env.JWT_SECRET
    );
    res.json({
        token: token
    })

}

module.exports = {
    signup,
    signin
};
