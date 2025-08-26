const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// user register controller
const registerUser = async (req, res) => {

  console.log(req.body);
  try {
    const { email, number, name, pin } = req.body;

    if (!email || !number || !name || !pin) {
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

    const hashedPin = await bcrypt.hash(pin, 10);
    const token = jwt.sign({ email, number }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    const user = await User.create({
      name,
      number,
      email,
      pin: hashedPin,
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
          name: user.name,
          number: user.number,
          email: user.email,
          photoURL: user.photoURL,
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
    const { email, pin } = req.body;

    
    if (!email || !pin) {
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

    if (!(await bcrypt.compare(pin, findUser.pin))) {
      return res.status(400).send({
        success: false,
        message: "Incorrect pin",
      });
    }

    if (findUser) {
      res.status(200).send({
        success: true,
        message: "User logged in successfully",
        user: {
          name: findUser.name,
          number: findUser.number,
          email: findUser.email,
          photoURL: findUser.photoURL,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const userVerify = async (req, res) => {
  try {
    const { acType, nid, email } = req.body;

    // Check if required fields exist
    if (!acType || !nid || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update user details
    if (acType === "user") {
      user.acType = acType;
      user.nid = nid;
      user.acStatus = "verified";
      user.balance += 40;
    }
    if (acType === "agent") {
      user.acType = acType;
      user.acStatus = "pending";
      user.nid = nid;
      
    }
    // Save updated user
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User verified successfully",
      user: {
        name: user.name,
        number: user.number,
        email: user.email,
        photoURL: user.photoURL,
      },
    });
  } catch (error) {
    console.error("Error verifying user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get all users with filtering and sorting
const getAllUsers = async (req, res) => {
  try {
    const { name, acType, acStatus, sortBy, order } = req.query;
    let filter = {};

    if (name) filter.name = new RegExp(name, "i"); // Case-insensitive search
    if (acType) filter.acType = acType;
    if (acStatus) filter.acStatus = acStatus;

    let sortQuery = {};
    if (sortBy) {
      sortQuery[sortBy] = order === "desc" ? -1 : 1;
    }

    const users = await User.find(filter).sort(sortQuery);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

const updateAgent = async (req, res) => {
  const { number, acStatus } = req.query;
  console.log(number, acStatus);

  try {
    if (!number || !acStatus) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ number });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.acStatus = acStatus;
    user.balance = 100000;


    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: {
        name: user.name,
        number: user.number,
        email: user.email,
        photoURL: user.photoURL,
        acStatus: user.acStatus, 
        balance: user.balance,
      },
    });
  } catch (error) {
    console.error("Server Error:", error); // Log the actual error
    res.status(500).json({ success: false, error: "Server Error" });
  }
};


module.exports = { registerUser, loginUser, userVerify, getAllUsers , updateAgent };