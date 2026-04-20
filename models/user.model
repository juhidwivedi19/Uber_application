

const mongoose = require('mongoose');
const bcrypt= require('bcrypt');     //ye sare package ko install kiya so yha import karaenge na
const jwt = require('jsonwebtoken');



const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
        type: String,
        required: true,
        minlength:[3,'First name must be atleast 3 characters long'],
        },

   
        lastname:{
        type: String,
        minlength:[3,'last name must be atleast 3 characters long'],
        }
    },

    email:{
        type:String,
        required:true,
        unique:true,
        minlength: [5,'email must be atleast 5 character long']
    },
    password:{
        type:String,
        required: true,  //yha kuchh aur use nhi karenge bcoz JWT hai authentication ke lie
        select:false
    },

    socketId:{
    type:String
    }
})



//generate token

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id}, process.env.JWT_SECRET)
   return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password);
}


userSchema.statics.hashPassword = async function (password){
  return await bcrypt.hash(password, 10);
}


const userModel = mongoose.model('user',userSchema);



module.exports = userModel;
