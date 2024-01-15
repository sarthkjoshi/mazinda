const mongoose = require('mongoose');
require('../lib/mongoose');
const SearchHistoryTrackSchema = new mongoose.Schema({
    userToken: { type: String },
    searchQuery: { type: String, required: true },
}, { timestamps: true });

mongoose.models = {}
export default mongoose.model("SearchHistoryTrack", SearchHistoryTrackSchema);