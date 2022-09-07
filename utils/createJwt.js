const jwt = require('jsonwebtoken');
const config = require('../config');
const getToken = async(user) => {
  return jwt.sign({ ...user }, config.jsonwebsecret, { expiresIn: '24h' });
};
module.exports = getToken ;
