const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const Parcel =  require("../models/parcelModel"); 

//  Create Parcel
const createParcel = async (req, res) => {
  try {
    const parcel = await Parcel.create(req.body);
    res.status(201).json({ success: true, data: parcel });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//  Get Parcel by ID

const getParcelById = async (req, res) => {
  try {
    const parcel = await Parcel.findById(req.params.id);
    if (!parcel) {
      return res.status(404).json({ success: false, message: "Parcel not found" });
    }
    res.json({ success: true, data: parcel });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//  Update Parcel Status
const updateParcel = async (req, res) => {
  try {
    const parcel = await Parcel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!parcel) return res.status(404).json({ success: false, message: "Parcel not found" });
    res.json({ success: true, data: parcel });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//  Delete Parcel (Admin Only)
const deleteParcel = async (req, res) => {
  try {
    const parcel = await Parcel.findByIdAndDelete(req.params.id);
    if (!parcel) return res.status(404).json({ success: false, message: "Parcel not found" });
    res.json({ success: true, message: "Parcel deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};



const getParcelsByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ success: false, message: "Invalid customerId" });
    }

    const parcels = await Parcel.find({ customerId });

    if (!parcels || parcels.length === 0) {
      return res.status(404).json({ success: false, message: "No parcels found for this customer" });
    }

    res.json({ success: true, data: parcels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



module.exports = { createParcel, getParcelById, updateParcel, deleteParcel , getParcelsByCustomer};