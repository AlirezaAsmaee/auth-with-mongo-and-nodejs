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
        console.log('here-2');

        if (!req.headers['authorization']) return next(createError.Unauthorized());
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(' ')[1];
        JWT.verify(token, 'asmaee', (err, payload) => {
            if (err) {
                return next(createError.Unauthorized(err.message));
            }
            req.payload = payload;
            next()
        })

    },
    refreshToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                // name: 'ali',
                // iss: 'payload.com'
                // aud: userId,
            }
            const secret = 'asmaee2'

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
    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(refreshToken, 'asmaee2', (err, payload) => {
                if (err) {
                    return reject(createError.Unauthorized())
                }
                console.log('here ', payload.aud);
                const userId = payload.aud;

                resolve(userId)
            })
        }
        )
    },
}