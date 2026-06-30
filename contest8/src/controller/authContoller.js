const { pool } = require("../db");
const jwt = require("jsonwebtoken");
const { SignupSchema, SigninSchema } = require("../types/types");
const bcrypt = require("bcrypt");

async function signupController(req, res) {
    try {
        const result = SignupSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Inputs"
            })
        }
        const { username, password } = result.data;

        const userExists = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

        if (userExists.rows.length > 0) {
            return res.status(401).json({
                success: false,
                message: "user with this username already exists"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query("INSERT INTO users (username, password) VALUES ($1,$2) RETURNING id;", [username, hashPassword]);

        return res.status(201).json({
            success: true,
            message: "user created sucessfully",
            user: newUser.rows[0]
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ""
        })
    }
}

async function signinController(req, res) {
    try {
        const result = SigninSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid request body"
            });
        }

        const { username, password } = result.data;
        const userExists = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

        if (userExists.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "user not found"
            });
        }
        const user = userExists.rows[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "invalid password"
            })
        }

        const token = jwt.sign({ userId: user.id, username: username }, process.env.JWT_SECRET);

        return res.status(200).json({
            success: true,
            message: "user signed in sucessfully",
            token: token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

module.exports = {
    signupController,
    signinController
}