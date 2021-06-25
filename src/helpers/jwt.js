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

const verifyJWT = ( token = '' ) => {
    try {
        const { code } = jwt.verify(token, process.env.JWT_KEY );
        return [true, code];  
    } catch (error) {
        return [false, null];
    }
}

module.exports = {
    generateJWT,
    verifyJWT
}