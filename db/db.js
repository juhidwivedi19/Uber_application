//for database connection and schema definition

const mongoose = require('mongoose');

function connectToDb(){  //database connection ke lie function ka use kar rahe hain taki server.js file me use kar sakein
   mongoose.connect(process.env.DB_CONNECT)
   .then(() => console.log('Connected To DB'))
   .catch(err => console.log(err));
}

module.exports = connectToDb;