const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller');
const {body} = require('express-validator');
const { authCaptain } = require('../middlewares/auth.middleware');
router.post('/register',[
    body('email').isEmail().withMessage('Inavlid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be atleast 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be ataleast 6 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be atleast 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate must be atleast 3 characters long'),
    body('vehicle.capacity').isInt({min:1}).withMessage('Capcity must be atleast 1'),
    body('vehicle.vehicleType').isIn(['car','motorcyle','auto']).withMessage('Invalid Vehicle')
],captainController.registerCaptain
)
router.post('/login',[
    body('email').isEmail().withMessage('Inavlid Email'),
    body('password').isLength({min:6}).withMessage('Password must be ataleast 6 characters long'),
], captainController.loginCaptain
)
router.get('/profile', authCaptain, captainController.getCaptainProfile);
router.get('/logout', authCaptain,captainController.logoutCaptain
);
module.exports = router;
