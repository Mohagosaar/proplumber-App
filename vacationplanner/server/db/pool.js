const Pool = require("pg").Pool;
require("dotenv").config();
const pool = new Pool({
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  localhost: process.env.HOST,
  port: process.env.DBPORT,
  database: "vocationPlanner",
});

module.exports = pool;
