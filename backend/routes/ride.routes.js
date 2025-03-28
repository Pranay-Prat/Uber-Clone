const express = require('express');
const Router = express.Router();
const {query, body} = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');
Router.post('/create', 
    authMiddleware.authUser,
    body('pickup').isString().isLength({min: 3}).withMessage('Invalid Pickup Address'),
    body('destination').isString().isLength({min: 3}).withMessage('Invalid Destination Address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'motorcycle']).withMessage('Invalid Vehicle Type'),
    rideController.createRide)
Router.get('/get-fare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({min: 3}).withMessage('Invalid Pickup Address'),
    query('destination').isString().isLength({min: 3}).withMessage('Invalid Destination Address'),
    rideController.getFare
)

module.exports = Router;