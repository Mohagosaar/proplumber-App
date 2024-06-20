const Pool = require("pg").Pool;

const pool = new Pool({
  user: "moha.ali",
  password: "",
  localhost: "postgress",
  database: "authTodos",
  port: 5432,
});

module.exports = pool;
