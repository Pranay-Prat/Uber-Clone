
const rideModel = require('../models/ride.model');
const mapsService = require('../services/maps.service');
const crypto = require('crypto');
const { sendMessageToSocketId } = require('../socket');

async function getFare(pickup, destination) {

    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapsService.getDistanceTime(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 7,
        car: 10,
        moto: 6
    };

    const perMinuteRate = {
        auto: 1.8,
        car: 2.8,
        moto: 1.5
    };



    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distanceInKm ) * perKmRate.auto) + ((distanceTime.duration ) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distanceInKm) * perKmRate.car) + ((distanceTime.duration ) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distanceInKm ) * perKmRate.moto) + ((distanceTime.duration) * perMinuteRate.moto))
    };

    return fare;


}
function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}
module.exports.getFare = getFare;
module.exports.createRide = async({user,pickup,destination,vehicleType}) => {
    if(!user || !pickup || !destination || !vehicleType) {
        throw new Error('User, Pickup, Destination and Vehicle Type are required');
    }
    const fare = await getFare(pickup, destination);
    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType]
    });
    return ride;
}
module.exports.confirmRide = async(rideId,captainId) => {
    if(!rideId) {
        throw new Error('Ride ID is required');
    }
    await rideModel.findByIdAndUpdate({_id: rideId}, {status: 'accepted',
        captain: captainId
    });
    const ride = await rideModel.findOne({_id: rideId}).populate('user').populate('captain').select('+otp');
    if(!ride) {
        throw new Error('Ride not found');
    }

    return ride;
}
module.exports.startRide = async (rideId, otp, captain)=>{
    if(!rideId || !otp){
        throw new Error('Ride ID and OTP are required');
    }
    const ride = await rideModel.findOne({
        _id:rideId

    }).populate('user').populate('captain').select('+otp');
    if(!ride){
        throw new Error('Ride not found');
    }
    if(ride.status !== 'accepted'){
        throw new Error('Ride not accepted')
    }
    if(ride.otp !== otp){
        throw new Error('Invalid OTP')
    }
    await rideModel.findOneAndUpdate({
        _id: rideId
    },{
        status: 'ongoing'
    })
    sendMessageToSocketId(ride.user.socketId,{
        event: 'ride-started',
        data: ride
    })
    return ride
}
module.exports.endRide = async (rideId, captainId) => {
    if(!rideId || !captainId){
        throw new Error('Ride ID and Captain ID are required');
    }
    const ride = await rideModel.findOne({_id: rideId, captain: captainId}).populate('user').populate('captain').select('+otp');
    if(!ride){
        throw new Error('Ride not found');
    }
   
    
    if(ride.status !== 'ongoing'){
        throw new Error('Ride not ongoing')
    }
    await rideModel.findOneAndUpdate({
        _id: rideId
    },{
        status: 'completed'
    })
    sendMessageToSocketId(ride.user.socketId,{
        event: 'ride-ended',
        data: ride
    })
    return ride   
}