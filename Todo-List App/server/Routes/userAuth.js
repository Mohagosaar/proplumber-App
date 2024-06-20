const pool = require("../db/pool");
const router = require("express").Router();
const { hash } = require("bcrypt");
const { compare } = require("bcrypt");
const jwtGenerator = require("../util/jwtgenerator");
const Authorize = require("../middleWare/Authorize");

//Pos route
router.post("/register", async (req, res) => {
  try {
    const { username, userEmail, password } = req.body;
    console.log(username, userEmail, password);

    const checkUser = await pool.query(
      `SELECT * FROM "users" WHERE "userEmail"=$1`,
      [userEmail]
    );

    if (checkUser.rows.length > 0) {
      return res
        .status(401)
        .json({ msg: "this user is exist", user: checkUser.rows[0] });
    }
    const hashedPassword = await hash(password, 10);

    const newUser = await pool.query(
      `INSERT INTO "users" ("username","userEmail","password") VALUES($1,$2,$3) RETURNING user_id`,
      [username, userEmail, hashedPassword]
    );
    if (newUser.rows.length > 0) {
      console.log();
      const token = jwtGenerator(newUser.rows[0].user_id);
      return res.status(200).json({ token });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

//Login route

router.post("/login", async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    console.log(userEmail, password);
    if (!userEmail || !password) {
      return res.json({ error: "Email and password are required" });
    }
    const userLogin = await pool.query(
      `SELECT * FROM "users" WHERE "userEmail"=$1`,
      [userEmail]
    );
    if (userLogin.rows.length === 0) {
      return res.json({ error: "Invalid email or password" });
    }
    const validPassword = await compare(password, userLogin.rows[0].password);
    if (!validPassword) {
      return res.json({ error: "Invalid email or password" });
    }
    const token = jwtGenerator(userLogin.rows[0].user_id);
    res.status(200).json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Error/ login");
  }
});

router.get("/isverified", Authorize, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
