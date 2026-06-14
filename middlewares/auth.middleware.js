const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const blackListTokenModel = require('../models/blackListToken.model');


// =======================
// USER AUTH
// =======================
module.exports.authUser = async (req, res, next) => {
    try {
        const token =
            req.cookies?.token ||
            req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        // check blacklist
        const isBlacklisted = await blackListTokenModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Token is blacklisted.' });
        }

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded?._id) {
            return res.status(401).json({ message: 'Invalid token payload.' });
        }

        // find user
        const user = await userModel.findById(decoded._id).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }

        req.user = user;
        req.token = token;

        return next();

    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized access.' });
    }
};


// =======================
// CAPTAIN AUTH
// =======================
module.exports.authCaptain = async (req, res, next) => {
    try {
        const token =
            req.cookies?.token ||
            req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        // check blacklist
        const isBlacklisted = await blackListTokenModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Token is blacklisted.' });
        }

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded?._id) {
            return res.status(401).json({ message: 'Invalid token payload.' });
        }

        // find captain
        const captain = await captainModel.findById(decoded._id).select('-password');

        if (!captain) {
            return res.status(401).json({ message: 'Captain not found.' });
        }

        req.captain = captain;
        req.token = token;

        return next();

    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized access.' });
    }
};