const Authorize = require("../middleWare/Authorize");
const pool = require("../db/pool");
const router = require("express").Router();
//get

router.get("userVerify", Authorize, async (req, res) => {
  try {
  } catch (err) {}
});

router.get("/", Authorize, async (req, res) => {
  try {
    const user = await pool.query(
      `SELECT "users".username, "todos".todo_id, "todos".description FROM "users"
      LEFT JOIN "todos" 
      ON "users".user_id = "todos".user_id WHERE "users".user_id=$1`,
      [req.user.id]
    );

    res.json(user.rows);
  } catch (err) {
    console.log(err.message);
    res.status(403).json("Not authorized");
  }
});

// post

router.post("/todos", Authorize, async (req, res) => {
  const { description } = req.body;
  try {
    const { description } = req.body;
    const userTodos = await pool.query(
      `INSERT INTO "todos"("user_id", "description") VALUES($1,$2) RETURNING *`,
      [req.user.id, description]
    );
    userTodos
      ? res.status(200).json(userTodos.rows)
      : res.status(401).json("Unable to add");
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

// UPDATE

router.put("/todos/:id", Authorize, async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  console.log(id, description);
  try {
    const { id: todo_id } = req.params; // Destructuring todo_id from req.params
    const { description } = req.body;

    const updateTodos = await pool.query(
      `UPDATE "todos" SET "description"=$1 WHERE "todo_id"=$2 AND "user_id"=$3`,
      [description, todo_id, req.user.id] // Using todo_id from req.params and user_id from JWT payload
    );

    if (updateTodos.rowCount > 0) {
      return res.status(200).json("Updated Successfully");
    } else {
      return res.status(404).json("Unable to update todo or todo not found");
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json("Server Error");
  }
});

// Delete

router.delete("/todosDelete/:id", Authorize, async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const { id: todo_id } = req.params;
    const deleteTodos = await pool.query(
      `DELETE FROM "todos" WHERE "todo_id"=$1 AND "user_id"=$2  `,
      [todo_id, req.user.id]
    );
    if (deleteTodos.rowCount > 0) {
      return res.status(200).json("Deleted Successfully");
    } else {
      return res.status(404).json("Unable to delete todo or todo not found");
    }
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
