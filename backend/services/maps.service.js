const axios = require('axios');
 module.exports.getAddressCoordinate = async (address) => {
const apiKey = process.env.GOOGLE_MAPS_API;
const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
try {
    const response = await axios.get(url);
    if(response.data.status === 'OK'){
        const location = response.data.results[0].geometry.location;
        return{
            ltd: location.lat,
            lng: location.lng
        };
    }
    else{
        throw new Error('Unable to find location');
    }
} catch (error) {
    console.error(error);
    throw error;
 }
}
module.exports.getDistanceTime = async (origin, destination) => {
    if(!origin || !destination){
        throw new Error('Origin and destination are required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            if(response.data.rows[0].elements[0].status === 'ZERO_RESULTS'){
                throw new Error('No results found');
            }
              return response.data.rows[0].elements[0];}
             else {
                throw new Error('Unable to find distance and time');
             } 
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
module.exports.getAutoSuggestions = async (input) => {
    if(!input){
        throw new Error('Input is required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            return response.data.predictions;
        }
        else{
            throw new Error('Unable to find suggestions');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
module.exports.getCaptainInTheRadius = async (ltd, lng, radius) => {
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ lng, ltd ], radius / 3963.2 ] 
            }
        }
    });
}