const jwt = require('jsonwebtoken');

const generateJWT = ( code ) => {
    return new Promise((resolve, reject) => {
        console.log(code);
        const payload = { code };
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generateJWT
}