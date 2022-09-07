const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  salt: process.env.SALT,
  port: process.env.PORT,
  jsonwebsecret: process.env.JWT_SECRET,
   
};
