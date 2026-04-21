const userModel = require('../models/user.model');

module.exports.createUser = async ({
    firstname,lastname,email,password
}) => {
  if(!firstname  || !email || !password) {  //agar ye teeno nhi milte hai to aap ek error throw kar doge
    throw new Error("All fields are required");
  }
  const user = userModel.create({
    fullname: {
      firstname,
      lastname
    },
    email,
    password
  });
  return user;
};