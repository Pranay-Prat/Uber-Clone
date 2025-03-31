const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapsService = require('../services/maps.service');
const {sendMessageToSocketId} = require('../socket');
const rideModel = require('../models/ride.model');
module.exports.createRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { pickup, destination, vehicleType } = req.body;

        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });

        const pickupCoordinates = await mapsService.getAddressCoordinate(pickup);
        console.log(pickupCoordinates);

        const captainsInRadius = await mapsService.getCaptainInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 10);
        ride.otp="";
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');
        
        captainsInRadius.map(captain=>{
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser,
            });
        })

        return res.status(201).json(ride);  
    } catch (error) {
        console.error("Error in createRide:", error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { pickup, destination } = req.query;
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (error) {
        console.error("Error in getFare:", error);
        return res.status(500).json({ message: error.message });
    }
};
module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { rideId,captainId  } = req.body;
        const ride = await rideService.confirmRide(rideId, captainId);
        console.log(ride.user)
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride,
        });

        return res.status(200).json(ride);
    } catch (error) {
        console.error("Error in confirmRide:", error);
        return res.status(500).json({ message: error.message });
    }
}
module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { rideId , otp } = req.query;
        const ride = await rideService.startRide(
            rideId, otp, req.captain
    )
        console.log(ride)
        
        return res.status(200).json(ride);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { rideId } = req.body;
        const ride = await rideService.endRide(rideId, req.captain._id);
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride,
        });
        return res.status(200).json(ride);
    } catch (error) {
        console.error("Error in endRide:", error);
        return res.status(500).json({ message: error.message });
    }
}