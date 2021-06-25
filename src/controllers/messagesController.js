"use strict"

const { response } = require('express');
const Message = require('../models/message');

const messagesController = async (req, res = response) => {

    try {
        
        const myCode = req.code;
        const messagesFrom = req.params.from;

        const messages = await Message.find({
            $or: [{ from: myCode, to: messagesFrom }, {from : messagesFrom, to: myCode}]
        }).sort({ createdAt: 'desc' });

        res.json({
            ok: true,
            messages
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
    messagesController,
}