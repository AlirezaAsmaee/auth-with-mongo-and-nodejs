const JWT = require('jsonwebtoken');
const createError = require('http-errors');


module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                // name: 'ali',
                // iss: 'payload.com'
                // aud: userId,
            }
            const secret = 'asmaee'

            const option = {
                expiresIn: '1h',
                issuer: 'payload.com',
                audience: userId

            }
            JWT.sign(payload, secret, option, (err, token) => {
                if (err) reject(err)
                resolve(token);
            })
        })
    }
}