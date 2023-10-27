const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: { type: Object, required: true },
    pricing: { type: Object },
    instructions: { type: String },
    status: { type: String, default: 'Processing' },
    imageURI: { type: String, default: "https://images.examples.com/wp-content/uploads/2017/05/Store-Inventory-Examples-amp-Samples2.jpg" },
}, { timestamps: true });

mongoose.models = {}
export default mongoose.model("Order", OrderSchema);