const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
    name: { type: String, required: true },
    audience: { type: mongoose.Schema.Types.ObjectId, ref: 'Audience', required: true },
    sent: { type: Number, default: 0 },
    failed: { type: Number, default: 0 },
});

const Campaign = mongoose.model('Campaign', CampaignSchema);
module.exports = Campaign;
