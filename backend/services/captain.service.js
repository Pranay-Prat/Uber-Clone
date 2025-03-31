const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({ firstname, lastname, email, password, color, plate, capacity, vehicleType, location }) => {
  if (!firstname || !email || !password || !plate || !capacity || !vehicleType || !color) {
    throw new Error('Required fields are missing');
  }
  const captainData = {
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    },
    location: {
      type: 'Point',
      coordinates: [location.ltd, location.lng],
    },
  };
 

  const captain = await captainModel.create(captainData);
  return captain;
};
