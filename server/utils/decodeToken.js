const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

exports.getUserIdFromToken = (token) => {
    try {
        const decoded = jwt.verify(token, config.secret);
        return decoded.id;
    } catch (err) {
        console.log('Error decoding token: ', err);
        return null;
    }
}



  