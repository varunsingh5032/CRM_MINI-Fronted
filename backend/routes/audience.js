const express = require('express');
const router = express.Router();
const Audience = require('../models/Audience');
const { validateAudience } = require('../middleware/validate');

// Create a new audience
router.post('/', validateAudience, async (req, res) => {
    try {
        const { rules } = req.body;
        const audience = new Audience({ rules });
        await audience.save();
        res.status(201).send(audience);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
