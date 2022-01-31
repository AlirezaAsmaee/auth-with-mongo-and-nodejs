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
    },
    verifyAccessToken: async (req, res, next) => {
        if (!req.headers['authorization']) return next(createError.Unauthorized());
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(' ')[1];
        JWT.verify(token, 'asmaee', (err, payload) => {
            if (err) {
                return next(createError.Unauthorized());
            }
            req.payload = payload;
            next()
        })

    }
}