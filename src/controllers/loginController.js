"use strict"

const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const loginUserController = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // Verify if user existis
        const userBD = await User.findOne({ email });
        if(!userBD) {
            return res.status(404).json({
                ok: false,
                message: `Email o contraseña incorrectos`
            });
        }

        // Validated password
        const validPassword = bcrypt.compareSync(password, userBD.password );
        if(!validPassword ){
            return res.status(400).json({
                ok: false,
                message: `Email o contraseña incorrectos`
            });
        }

        // Generate JWT
        const token = await generateJWT( userBD._id );

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
    loginUserController,
}