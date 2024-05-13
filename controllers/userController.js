const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

//@desc Register user
//@route POST /api/users/register
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Not all fields have been entered");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created: ${user.username}`);
  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid data is not valid ");
  }
});

//@desc login user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Login" });
});

//@desc Current user
//@route POST /api/users/current
//@access Private
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Current User" });
});

module.exports = { registerUser, loginUser, currentUser };
