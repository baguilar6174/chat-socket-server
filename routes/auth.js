/**
 * path: /api/v1/auth/signup
 */

const { Router } = require('express');
const { body } = require('express-validator');

const { registerUser } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate_fields');

const router = Router();

router.post('/', [
    body('name').trim().not().isEmpty().withMessage('name es requerido'),
    body('email').trim().not().isEmpty().withMessage('email es requerido').isEmail().withMessage('email incorrecto'),
    body('password').trim().not().isEmpty().withMessage('password es requerido'),
    validateFields,
], registerUser );

module.exports = router;