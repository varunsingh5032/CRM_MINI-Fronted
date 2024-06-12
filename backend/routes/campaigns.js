const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');
const Audience = require('../models/Audience');
const { validateCampaign } = require('../middleware/validate');

// Get all campaigns
router.get('/', async (req, res) => {
    try {
        const campaigns = await Campaign.find().populate('audience');
        res.send(campaigns);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Create a new campaign
router.post('/', validateCampaign, async (req, res) => {
    try {
        const { name, audienceId } = req.body;
        const audience = await Audience.findById(audienceId);
        if (!audience) {
            return res.status(404).send({ message: 'Audience not found' });
        }
        const campaign = new Campaign({ name, audience: audienceId });
        await campaign.save();
        res.status(201).send(campaign);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
