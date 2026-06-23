require('dotenv').config();
const express = require("express");
const app = express();
app.use(express.json())

const authRouter = require("./routes/authRoutes");
app.use('/', authRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});