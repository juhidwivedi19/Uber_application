const CaptainController = require('../controllers/captain.controller');
const express = require('express');
const router = express.Router();
const {body} = require("express-validator");
const authMiddleware = require('../middlewares/auth.middleware');



router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min:6}).withMessage('password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3}).withMessage('Vehicle color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min: 3}).withMessage('Vehicle plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({ min: 1}).withMessage('Vehicle capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Vehicle type must be either car, motorcycle, or auto')
],
CaptainController.registerCaptain
)


router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min:6}).withMessage('Password must be at least 6 characters long')
],
CaptainController.loginCaptain
)

router.get('/profile', authMiddleware.authCaptain, CaptainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, CaptainController.logoutCaptain);

module.exports = router;