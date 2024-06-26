const mongoose = require("mongoose");
require("../lib/mongoose");
const StoreSchema = new mongoose.Schema(
  {
    ownerName: { type: String, required: true },
    storeName: { type: String, required: true },
    mobileNumber: { type: Number, required: true, unique: true },
    alternateMobileNumber: { type: Number, required: true },
    businessType: { type: Array },
    gstin: { type: String },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    storeAddress: { type: Object, required: true },
    category: { type: String },
    followers: { type: Array },
    businessType: { type: Array },
    openStatus: { type: Boolean, default: true },
    approvedStatus: { type: String, default: "pending" },
    productBucket: { type: Array, default: [] },
    disableShop: { type: Boolean, deafult: false },
    serviceable_pincodes: { type: Array },
    storeCoordinates: {
      type: {
        latitude: { type: String },
        longitude: { type: String },
      },
    },
  },
  { timestamps: true }
);
mongoose.models = {};
export default mongoose.model("Store", StoreSchema);
