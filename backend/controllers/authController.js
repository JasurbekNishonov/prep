const bcrypt = require("bcryptjs");
const pool = require("../db");
const { findUserByEmail, createUser } = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Method: POST
// @route: auth/regsiter
// description: register new user
const registerUser = async (req, res) => {
  try {
    const { username, email, password, confirm_password } = req.body;

    // auth
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // confirm password
    if (password !== confirm_password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // checking if the email already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // hashing password here
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(username, email, hashedPassword);

    // successful
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
  }
};

// Method: POST
// @route: auth/login
// description: login new user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const login_query = "SELECT * FROM users WHERE email=$1";
    const result = await pool.query(login_query, [email]);

    // checking if the user doesn't exist
    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User with this email doesn't exist" });
    }

    //password checking
    const isMatch = await bcrypt.compare(password, result.rows[0].password);
    if (!isMatch) {
      return res
        .status(404)
        .json({ message: "Password or Email is incorrect" });
    }

    // sending user private info
    const user = {
      id: result.rows[0].id,
      email: result.rows[0].email,
    };

    // jwt here
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({ message: "Login successful", token: token });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { registerUser, loginUser };
