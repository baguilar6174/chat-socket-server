const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validateFields } = require('../middlewares/validate_fields');

const { registerUserController } = require('../controllers/registerController');
const { loginUserController } = require('../controllers/loginController');
const { refreshTokenController } = require('../controllers/refreshTokenController');
const { validateJWT } = require('../middlewares/validate_jwt');
const { usersController } = require('../controllers/users');
const { messagesController } = require('../controllers/messagesController');


/**
 * path: /api/v1/auth/signup
 */

router.post('/auth/signup', [
    body('name').trim().not().isEmpty().withMessage('name es requerido'),
    body('email').trim().not().isEmpty().withMessage('email es requerido').isEmail().withMessage('email incorrecto'),
    body('password').trim().not().isEmpty().withMessage('password es requerido'),
    validateFields,
], registerUserController );

/**
 * path: /api/v1/auth/signin
 */

 router.post('/auth/signin', [
    body('email').trim().not().isEmpty().withMessage('email es requerido').isEmail().withMessage('email incorrecto'),
    body('password').trim().not().isEmpty().withMessage('password es requerido'),
    validateFields,
], loginUserController );

/**
 * path: /api/v1/auth/refreshToken
 */

 router.get('/auth/refreshToken', validateJWT, refreshTokenController );


 /**
 * path: /api/v1/users
 */

  router.get('/users', validateJWT, usersController );


  
 /**
 * path: /api/v1/messages
 */

  router.get('/messages/:from', validateJWT, messagesController );



module.exports = router; 