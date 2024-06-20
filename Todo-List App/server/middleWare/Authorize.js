const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    // Extract token from the header
    const token = req.header("token");

    // If no token is present, return a 403 status
    if (!token) {
      return res.status(403).json("Not Authorized");
    }

    // Verify the token using the secret from the environment variables
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user payload to the request object
    req.user = payload.user;

    // Call the next middleware or route handler
    next();
  } catch (err) {
    console.error(err.message);
    // If verification fails, return a 403 status
    return res.status(403).json("Not Authorized");
  }
};
