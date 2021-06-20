"use strict"

const express = require('express');
const router = express.Router();

// Default Response Running Serve
router.get('', (req, res) => {
    return res.json({
        message: 'Server Running',
        date: new Date(),
    });
});

module.exports = router; 