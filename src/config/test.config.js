const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    uri: process.env.HOST_EXPORT+':'+process.env.PORT+'/api/',
};