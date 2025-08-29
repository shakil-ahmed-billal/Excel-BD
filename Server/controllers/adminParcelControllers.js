const mongoose = require("mongoose");
const Parcel = require("../models/parcelModel");
const User = require("../models/userModel");



// Show all parcels
const getAllParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find().populate("assignedAgent").populate("customerId");
    res.json({ success: true, data: parcels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Show all agents
const getAllAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: "agent" });
    res.json({ success: true, data: agents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Show all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "customer" });
    res.json({ success: true, data: customers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Assign parcel to agent
const assignParcelToAgent = async (req, res) => {
  try {
    const { parcelId, agentId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(parcelId) || !mongoose.Types.ObjectId.isValid(agentId)) {
      return res.status(400).json({ success: false, message: "Invalid IDs provided" });
    }

    const parcel = await Parcel.findById(parcelId);
    if (!parcel) return res.status(404).json({ success: false, message: "Parcel not found" });

    const agent = await User.findById(agentId);
    if (!agent || agent.role !== "agent") {
      return res.status(404).json({ success: false, message: "Agent not found" });
    }

    parcel.assignedAgent = agentId;
    parcel.status = "assigned";
    await parcel.save();

    res.json({ success: true, message: "Parcel assigned successfully", data: parcel });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllParcels,
  getAllAgents,
  getAllCustomers,
  assignParcelToAgent,
};
