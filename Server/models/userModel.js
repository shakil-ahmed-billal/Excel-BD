const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    photoURL: { type: String, default: "" },
    number: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    pin: { type: String, required: true },
    nid: { type: String, default: "" },
    balance: { type: Number, default: 0 },
    acType: { type: String, enum: ["customer", "agent" , "admin"], default: "customer" },
    acStatus: { type: String, enum: ["unverified", "verified", "pending" ,"suspended"], default: "unverified" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;