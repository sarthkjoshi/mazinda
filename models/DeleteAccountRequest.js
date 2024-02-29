const mongoose = require("mongoose");

const DeleteAccountRequestSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model(
  "DeleteAccountRequest",
  DeleteAccountRequestSchema
);
