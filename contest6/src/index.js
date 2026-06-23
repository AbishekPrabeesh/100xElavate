const express = require("express");
const app = express();
const { z } = require("zod");

const db = require("./db");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");

app.use(express.json());
app.use('/', authRouter);
app.use('/user', userRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});