const mongoose = require("mongoose");

const LookingForSchema = new mongoose.Schema({
  image: { type: String, required: true },
  link_type: { type: String, required: true },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  cityIds: { type: Array, required: true },
});

mongoose.models = {};
export default mongoose.model("LookingFor", LookingForSchema);
