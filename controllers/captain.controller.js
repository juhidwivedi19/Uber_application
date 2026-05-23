const blackListTokenModel = require('../models/blackListToken.model');
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
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email: email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType
});
  
  const token = captain.generateAuthToken();

  res.status(201).json({ token,captain });



}


module.exports.loginCaptain = async (req,res,next) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
   }

   const {email, password} = req.body;

   const captain = await captainModel.findOne({ email}).select('+password');

   const isMatch = await captain.comparePassword(password);

   if(!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password' });
   }

   //if password doest match then generate token and return response
   const token = captain.generateAuthToken();
   
   res.cookies('token', token);

   res.status(200).json({ token, captain}) ;
}

module.exports.getCaptainProfile = async (req,res,next) => {
  res.status(200).json({ captain: req.captain});
}


module.exports.logoutCaptain = async (req,res,next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  await blackListTokenModel.create({token});
  
  res.clearCookies('token');

   res.status(200).json({ message: 'Logout Successfully'});
}