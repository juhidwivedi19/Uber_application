const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.authUser = async (req,res,next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {  //hame token nhi mila to ye message aaega
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }


    //blacklist token me check karna hai ki token blacklist me to nhi hai bcoz agar token blacklist me hai to usko use nahi karna chahiye

    const isBlacklisted = await userModel.findOne({ token:token });

    if(isBlacklisted) {
        return res.status(401).json({ message: 'Invalid token.' });
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  //token ko decode karne ke lie jwt.verify ka use karte hai
       const user = await userModel.findById(decoded._id)

       req.user = user;  //req.user me user ki information store karte hai
        
       return next();  //next() ka use karte hai taki agle middleware ya route handler me ja sake


    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
}