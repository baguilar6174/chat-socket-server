"use strict"

const { response } = require('express');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const refreshTokenController = async (req, res = response) => {

    try {

        const code = req.code;
        const userBD = await User.findById({ _id: code });

        // Generate JWT
        const token = await generateJWT( code );

        res.json({
            ok: true,
            user: userBD,
            token
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
    refreshTokenController,
}