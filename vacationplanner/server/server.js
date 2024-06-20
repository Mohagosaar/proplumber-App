const PORT = process.env.PORT || 4008;
const pool = require("./db/pool");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

//Post a new To do
app.post("/todos", async (req, res) => {
  const { user_email, title, dateCreated, dueDate } = req.body;

  console.log(user_email, title, dateCreated, dueDate);
  try {
    const todos = await pool.query(
      `INSERT INTO todos ("user_email", "title", "dateCreated", "dueDate") VALUES($1,$2,$3,$4)`,

      [user_email, title, dateCreated, dueDate]
    );
    res.json(todos);
  } catch (error) {
    console.log(error);
  }
});

//Edit post

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { user_email, title, dateCreated, dueDate } = req.body;

  try {
    const editTodos = await pool.query(
      `UPDATE todos SET "user_email"=$1, "title"=$2, "dateCreated"=$3, "dueDate"=$4 WHERE id=$5`,
      [user_email, title, dateCreated, dueDate, id]
    );

    if (editTodos.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({ message: "Todo updated successfully", editTodos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTodos = await pool.query(`DELETE FROM todos WHERE id=$1`, [id]);
    res.json(deleteTodos);
  } catch (err) {
    console.error(err);
  }
});

//signup
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const signup = await pool.query(
      `INSERT INTO users(email, hashed_password) VALUES($1, $2)`,
      [email, hashedPassword]
    );

    const token = jwt.sign({ email }, "secret", {
      expiresIn: "1hr",
    });

    res.json({ email, token });
  } catch (err) {
    console.error(err);
    if (err) {
      res.json({ detail: "This username is already taken" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await pool.query(`SELECT * FROM users WHERE email=$1`, [
      email,
    ]);

    if (!users.rows.length) {
      return res.json({ detail: "User does not exist" });
    }

    const user = users.rows[0];
    const success = await bcrypt.compare(password, user.hashed_password);

    if (success) {
      const token = jwt.sign({ email }, "secret", {
        expiresIn: "1hr",
      });
      return res.json({ email: user.email, token });
    } else {
      return res.json({ detail: "Login failed" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
