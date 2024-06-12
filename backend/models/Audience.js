const mongoose = require('mongoose');

const AudienceSchema = new mongoose.Schema({
    rules: [{ type: String, required: true }],
});

const Audience = mongoose.model('Audience', AudienceSchema);
module.exports = Audience;
