const express = require("express");
const app = express();
const port = 3000;
const authRoutes = require("./routes/authRoutes");

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use("/auth", authRoutes);

app.listen(port, () => {
    console.log("server is running on port 3000");
}
);