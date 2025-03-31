const express = require('express');
const Router = express.Router();
const { query } = require('express-validator');

const authMiddleware = require('../middlewares/auth.middleware');
const mapController = require('../controllers/maps.controller');
Router.get('/get-coordinates', 
    query('address').isString().isLength({min: 3}),
    authMiddleware.authUser,
    mapController.getCoordinates
);
Router.get('/get-distance-time',
    query('origin').isString().isLength({min: 3}),
    query('destination').isString().isLength({min: 3}),
    authMiddleware.authUser || authMiddleware.authCaptain,
    mapController.getDistanceTime
)
Router.get('/get-suggestions',
    query('input').isString().isLength({min: 3}),
    authMiddleware.authUser,
    mapController.getAutoSuggestions
)
module.exports=Router;