const { response } = require('express');

const registerUser = ( req, res = response ) => {
    
    res.json({
        ok: true,
        msg: 'Register user'
    });
}

module.exports = {
    registerUser,
}