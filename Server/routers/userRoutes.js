const express = require("express");
const router = express.Router();
const { registerUser, loginUser, userVerify, getAllUsers, updateAgent } = require("../controllers/userControllers");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/verify", userVerify);
router.get("/allUser", getAllUsers);
router.get("/update", updateAgent);

module.exports = router;