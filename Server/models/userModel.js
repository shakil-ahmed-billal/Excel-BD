const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    photoURL: { type: String, default: "" },
    number: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 0 },
    role: { type: String, enum: ["customer", "agent" , "admin"], default: "customer" },
    acStatus: { type: String, enum: ["unverified", "verified", "pending" ,"suspended"], default: "unverified" },
    // Personal Information
    personalInfo: {
      firstName: { type: String},
      lastName: { type: String },
      email: { type: String},
      phone: { type: String },
      dateOfBirth: { type: Date },
      nationalId: { type: String },
    },

    // Address
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      country: { type: String },
    },

    // Employment Info
    employment: {
      employeeId: { type: String},
      department: {
        type: String,
        enum: ["delivery", "customer_service", "support", "admin"],
        default: "delivery",
      },
      joiningDate: { type: Date, default: Date.now },
      salary: { type: Number, default: 0 },
      vehicleType: { type: String, enum: ["motorcycle", "car", "van", "bicycle"] },
      licenseNumber: { type: String },
    },

    // Login Credentials
    credentials: {
      password: { type: String },
      confirmPassword: { type: String,  },
    },

    // Documents
    documents: {
      profilePhoto: { type: String, default: null },
      idDocument: { type: String, default: null },
      drivingLicense: { type: String, default: null },
    },

    // Agent Activity Fields
    isActive: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    totalDeliveries: { type: Number, default: 0 },
    completedToday: { type: Number, default: 0 },
    assignedParcels: { type: Number, default: 0 },

    currentLocation: {
      lat: { type: Number },
      lng: { type: Number },
      address: { type: String },
    },

    performance: {
      onTimeDeliveries: { type: Number, default: 0 },
      customerRating: { type: Number, default: 0 },
      totalEarnings: { type: Number, default: 0 },
      thisMonthEarnings: { type: Number, default: 0 },
    },

    recentDeliveries: [
      {
        id: { type: String },
        status: { type: String, enum: ["pending", "in_transit", "delivered"] },
        time: { type: String },
      },
    ],
  },
  { timestamps: true }
);


const User = mongoose.model("User", userSchema);

module.exports = User;