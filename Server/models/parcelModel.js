const mongoose = require("mongoose");

const dimensionSchema = new mongoose.Schema({
  length: { type: Number, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
});

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String },
  zipCode: { type: String },
  country: { type: String, default: "United States" },
  contactName: { type: String, required: true },
  contactPhone: { type: String, required: true },
});

const parcelDetailsSchema = new mongoose.Schema({
  type: { type: String, enum: ["document", "package", "fragile", "electronics"], required: true },
  weight: { type: Number, required: true },
  dimensions: { type: dimensionSchema, required: true },
  value: { type: Number, required: true },
  description: { type: String },
});

const parcelSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    trackingNumber: { type: String, required: true, unique: true },
    customer: { type: String, required: true },
    recipient: { type: String, required: true },
    status: { type: String, enum: ["pending", "in-transit", "delivered", "cancelled"], default: "pending" },
    recipientPhone: { type: String, required: true },
    priority: { type: String, enum: ["high", "medium", "low"], default: "low" },
    pickupAddress: { type: addressSchema, required: true },
    deliveryAddress: { type: addressSchema, required: true },
    parcelDetails: { type: parcelDetailsSchema, required: true },

    serviceType: { type: String, enum: ["standard", "express", "overnight"], default: "standard" },
    paymentType: { type: String, enum: ["prepaid", "cod"], default: "prepaid" },
    codAmount: { type: Number, default: 0 },

    pickupDate: { type: Date, required: true },
    pickupTime: { type: String, required: true },
    specialInstructions: { type: String },

    status: { type: String, enum: ["pending", "in-transit", "delivered", "cancelled"], default: "pending" },
  },
  { timestamps: true }
);

const Parcel = mongoose.model("Parcel", parcelSchema);

module.exports = Parcel;
