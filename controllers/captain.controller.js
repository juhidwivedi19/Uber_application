const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');


module.exports.registerCaptain = async (req,res,next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

  const { fullname,email, password, vehicle } = req.body;

  const isCaptainAlreadyExist = await captainModel.findOne({ email});  //is already captain exist or not, if exist then return error message otherwise create new captain
  
  if(isCaptainAlreadyExist){
    return res.status(400).json({ message: 'Captain with this email already exists' });
  }


  const hashedPassword = await captainModel.hashPassword(password);

const captain = await captainService.createCaptain({
  fullname: {
    firstname: fullname.firstname,
    lastname: fullname.lastname
  },
  email,
  password: hashedPassword,
  vehicle: {
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType
  }
});
  
  const token = captain.generateAuthToken();

  res.status(201).json({ token,captain });



}