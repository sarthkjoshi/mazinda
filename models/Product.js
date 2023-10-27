const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    storeId: { type: String, required: true },
    pricing: { type: Object },
    category: { type: String },
    subcategory: { type: String },
    topDeal: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },
    description: { type: String },
    isAvailable: { type: Boolean, default: true },
    imageURI: { type: String, default: "https://images.examples.com/wp-content/uploads/2017/05/Store-Inventory-Examples-amp-Samples2.jpg" },
    approvalStatus: { type: Boolean, default: false }
}, { timestamps: true });

mongoose.models = {}
export default mongoose.model("Product", ProductSchema);