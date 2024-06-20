const express = require("express");
const pool = require("./db/pool");
const userAuth = require("./Routes/userAuth");
const Dashboard = require("./Routes/Dashboard");
const app = express();
const PORT = process.env.PORT || 4008;

//MIDDLEWARES

app.use(express.json());
app.use("/api/user", userAuth);
app.use("/api/dashboard", Dashboard);

app.listen(PORT, () => console.log(`Server is running port${PORT}`));
