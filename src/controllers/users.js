"use strict"

const { response } = require('express');
const User = require('../models/user');

const usersController = async (req, res = response) => {

    try {
        // Pagination
        // const offset = Number(req.query.offset) || 0;
        // const limit = Number(req.query.limit) || 0;

        const users = await User.find({_id: {$ne: req.code}}).sort('-online');

        res.json({
            ok: true,
            users
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Server error'
        });
    }
}

module.exports = {
    usersController,
}