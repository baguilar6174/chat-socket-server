const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next ) => {
    // Get token
    const token = req.header('Authorization');
    
    if(!token) {
        return res.status(401).json({
            ok: false,
            message: `No token in request`
        });
    }

    try {
        const { code } = jwt.verify(token, process.env.JWT_KEY );
        req.code = code;
        next();    
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            message: 'Unauthorized token'
        });
    }
}

module.exports = {
    validateJWT    
}