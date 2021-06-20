"use strict"

const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const registerUserController = async (req, res = response) => {

    const { email, password } = req.body;
    try {

        // Verify if existis email
        const existsEmail = await User.findOne({ email });
        if(existsEmail) {
            return res.status(400).json({
                ok: false,
                message: `Ya existe un usuario con el email ${email}`
            });
        }

        const user = new User(req.body);
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password  = bcrypt.hashSync(password, salt);
        // Save in database
        await user.save();

        // Generate JWT
        const token = await generateJWT( user._id );

        res.json({
            ok: true,
            user,
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
    registerUserController,
}