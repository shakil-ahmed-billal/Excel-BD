
const express = require("express");
const { createParcel, deleteParcel, getParcelById, updateParcel, getParcelsByCustomer } = require("../controllers/parcelControllers");


const router = express.Router();

// API Routes
router.post("/", createParcel);          // Create Parcel
router.get("/:id", getParcelById);       // Get Parcel by ID
router.put("/:id", updateParcel);        // Update Parcel
router.delete("/:id", deleteParcel);     // Delete Parcel (Admin only - add middleware later)
router.get("/customer/:customerId", getParcelsByCustomer);


module.exports = router;
