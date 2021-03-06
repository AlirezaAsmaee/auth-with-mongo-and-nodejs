const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const User = require('../models/User.model');
const { authSchema } = require('../helpers/validation_schema')
const { signAccessToken, refreshToken, verifyRefreshToken } = require('../helpers/jwt')

router.post("/login", async (req, res, next) => {
    try {
        // const { email, password } = req.body;
        // if (!email || !password) throw createError.BadRequest()
        const result = await authSchema.validateAsync(req.body);
        const user = await User.findOne({ email: result.email });
        if (!user) throw createError.BadRequest('user name not found');
        const isMatch = await user.isValidPassword(result.password);
        if (!isMatch) throw createError.Unauthorized('password is not valid');

        const accessToken = await signAccessToken(user.id)
        const refresh = await refreshToken(user.id)

        res.send({ accessToken, date: new Date(), refresh });

    } catch (err) {
        next(err)
    }
})

router.post("/refresh-token", async (req, res, next) => {

    try {

        const { refresh } = req.body;
        if (!refresh) throw createError.BadRequest();
        const userId = await verifyRefreshToken(refresh);
        const accessToken = await signAccessToken(userId)
        const ref = await refreshToken(userId)
        res.send({ accessToken, date: new Date(), ref });



    } catch (e) {
        console.log({ ...e });
        next(e)
    }
})

router.post("/register", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // if (!email || !password) throw createError.BadRequest(!email
        //     ? !password ? 'password and email are required' : 'email is required'
        //     : !password ? 'password is required' : '');
        const result = await authSchema.validateAsync(req.body);
        // console.log('result', result);
        const doesExist = await User.findOne({ email: result.email });
        if (doesExist) throw createError.Conflict(`${result.email} already exists`);
        const user = new User(result);
        const saveUser = await user.save();
        const accessToken = await signAccessToken(saveUser.id)
        res.send({ accessToken });

    } catch (err) {
        next(err)
    }

})



router.post("/log-out", async (req, res, next) => {
    res.send('log-out')

})




module.exports = router;