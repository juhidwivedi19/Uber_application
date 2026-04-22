const express = require('express');
const router = express.Router();
const {body} = require("express-validator")
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min:6}).withMessage('password must be at least 6 characters long')
], userController.registerUser
)

//FOR LOGIN
router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min:6}).withMessage('password must be at least 6 characters long')
],
  userController.loginUser

)



//NOW FOR PROFILE UPDATE AND ALL WE CAN CREATE ANOTHER ROUTE FOR THAT AND USE AUTH MIDDLEWARE TO PROTECT THAT ROUTE

router.get('/profile',authMiddleware.authUser, userController.getUserProfile)  //yha pe auth middleware use karna hai bcoz profile protected route hai

router.get('/logout', authMiddleware.authUser, userController.logoutUser)







module.exports = router;
