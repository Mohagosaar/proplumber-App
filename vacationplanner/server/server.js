const PORT = process.env.PORT || 4008;
const pool = require("./db/pool");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Get All todos
app.get(`/todos`, async (req, res) => {
  try {
    const todos = await pool.query(`SELECT * FROM todos;`);
    res.status(200).json(todos.rows); // Send todos with status code 200 OK
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" }); // Send error response with status code 500 Internal Server Error
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
