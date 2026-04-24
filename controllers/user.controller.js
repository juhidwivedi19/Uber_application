
const userModel = require('../models/user.model.js');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');
const blackListTokenModel = require('../models/blackListToken.model');

//Register user
module.exports.registerUser = async (req,res,next) => {
   

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }


    const { fullname,email,password} = req.body;

    const isUserAlreadyExist = await userModel.findOne({ email }); //is already user exist or not, if exist then return error message otherwise create new user

    if(isUserAlreadyExist){
        return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await userModel.hashPassword(password);  // password ko aise normmal nhi likh sakte hai bcoz security ke liye usko hash karna padta hai


    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });


    const token = user.generateAuthToken();

    res.status(201).json({ token,user});

}


//login user
  module.exports.loginUser = async (req,res,next) => {
     
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

    const {email,password} = req.body;

    const user = await userModel.findOne({email}).select('+password');  //yha pe password ko select karna padta hai bcoz usko select:false kiya hua hai model me

    if(!user) {
        return res.status(401).json({message: 'Invalid email or passwoord'});
    }

    const isMatch = await user.comparePassword(password, user.password);
    if(!isMatch) {
        return res.status(400).json({message: 'Invalid email or password'});
    }

    const token = user.generateAuthToken();

    res.cookie('token',token);  //yha pe token ko cookie me store karna hai taki user ke browser me token store ho jaye aur usko har request me bheja jaye
    

    res.status(200).json({ token,user});


}



//get user profile
module.exports.getUserProfile = async (req,res,next) => {
    res.status(200).json(req.user);
}




//logout user
module.exports.logoutUser = async (req,res, next) => {
     
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await blackListTokenModel.create({token});  //blacklist token me token ko store karna hai taki usko future me use na kiya ja sake
    res.status(200).json({ message: 'Logged out successfully' });

}