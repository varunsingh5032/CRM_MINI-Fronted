const { check, validationResult } = require('express-validator');

const validateAudience = [
    check('rules').isArray().withMessage('Rules must be an array'),
    check('rules.*').isString().withMessage('Each rule must be a string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const validateCampaign = [
    check('name').isString().withMessage('Name must be a string'),
    check('audienceId').isMongoId().withMessage('Invalid audience ID'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = { validateAudience, validateCampaign };
