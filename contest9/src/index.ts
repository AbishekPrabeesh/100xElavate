import 'dotenv/config';
import express from "express";
const app = express();
app.use(express.json());

import authRouter from "./routes/authRoutes";
app.use('/', authRouter);


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});