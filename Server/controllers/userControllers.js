const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// user register controller
const registerUser = async (req, res) => {

  console.log(req.body);
  try {
    const { email, number, name, password } = req.body;

    if (!email || !number || !name || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (typeof number !== "string") {
      return res.status(400).json({
        success: false,
        message: "Phone number must be a valid string",
      });
    }

    const existingUser = await User.findOne({ number });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this number already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = jwt.sign({ email, number }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    const user = await User.create({
      name,
      number,
      email,
      password: hashedPassword,
    });
    res
      .cookie("token", token, {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      })
      .status(201)
      .json({
        success: true,
        message: "User created successfully",
        user: {
          customerId: user._id,
          name: user.name,
          number: user.number,
          email: user.email,
          photoURL: user.photoURL,
          role: user.role,
        },
      });
  } catch (error) {
    console.error("registerUser error", error);

    res.status(500).json({
      success: false,
      message:
        error.code === 11000
          ? "Duplicate entry detected"
          : "Internal Server Error",
    });
  }
};

// login user controller
const loginUser = async (req, res) => {

  console.log(req.body);
  
  try {
    const { email, password } = req.body;

    
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (!(await bcrypt.compare(password, findUser.password))) {
      return res.status(400).send({
        success: false,
        message: "Incorrect Password",
      });
    }

    if (findUser) {
      res.status(200).send({
        success: true,
        message: "User logged in successfully",
        user: {
          customerId: findUser._id,
          name: findUser.name,
          number: findUser.number,
          email: findUser.email,
          photoURL: findUser.photoURL,
          role: findUser.role,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};




module.exports = { registerUser, loginUser };