const axios = require('axios');
const captainModel = require('../models/captain.model');

// Get coordinates from address using Google Geocoding API
module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error(`Geocoding API Error: ${response.data.status}`);
        }
    } catch (error) {
        console.error("Error in getAddressCoordinate:", error.message);
        throw error;
    }
};

// Get estimated distance and time between two locations
module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const distanceData = response.data.rows[0].elements[0];

            if (!distanceData || !distanceData.distance) {
                throw new Error('No valid distance data found');
            }
            
            return {
                distanceInKm: distanceData.distance.value / 1000, // Convert meters to km
                duration: distanceData.duration.value / 60, // Convert seconds to minutes
            };
        } else {
            throw new Error(`Distance API Error: ${response.data.status}`);
        }
    } catch (error) {
        console.error("Error in getDistanceTime:", error.message);
        throw error;
    }
};

// Get auto-suggestions for places
module.exports.getAutoSuggestions = async (input) => {
    if (!input) {
        throw new Error('Input is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions;
        } else {
            throw new Error(`Places API Error: ${response.data.status}`);
        }
    } catch (error) {
        console.error("Error in getAutoSuggestions:", error.message);
        throw error;
    }
};

module.exports.getCaptainInTheRadius = async (ltd, lng, radiusKm) => {
    try {
        const captains = await captainModel.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lng, ltd] // Note: MongoDB uses [longitude, latitude] order
                    },
                    $maxDistance: radiusKm * 1000 // Convert km to meters
                }
            },
        
        });
        
        return captains;
    } catch (error) {
        console.error("Error finding nearby captains:", error);
        throw error;
    }
};
