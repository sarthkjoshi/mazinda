const mongoose = require('mongoose');
require('../lib/mongoose');
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    phoneNumber: { type: String, unique: true },
    password: { type: String },
    cart: { type: Array, default: [] },
    food_cart: { type: Array, default: [] },
    savedAddresses: { type: Array, default: [] },
    currentAddress: { type: Object, default: {} },
    password_reset_token: { type: String, trim: true },
}, { timestamps: true });

mongoose.models = {}
export default mongoose.model("User", UserSchema);