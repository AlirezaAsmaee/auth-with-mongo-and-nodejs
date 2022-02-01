const express = require('express')
const app = express();
const morgan = require('morgan');
const createError = require('http-errors');
const AuthRoutes = require('./routes/Auth.routes');
const bodyParser = require('body-parser');
const { verifyAccessToken } = require('./helpers/jwt');
const User = require('./models/User.model');

require('./helpers/database')
require('dotenv').config();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const PORT = process.env.PORT || 3000;
app.use("/auth", AuthRoutes)

app.use(verifyAccessToken, (req, res, next) => {
    next()
})

app.get('/',async(req, res, next) => {
    const user =await User.findById(req.payload.aud)
    res.send({ user })
})


app.use(async (req, res, next) => {
    next(createError.NotFound())
});

app.use(async (err, req, res, next) => {
    console.log('erro' , {err});
    res.status(err.status || 500)
    res.send({
        status: err.status || 500,
        message: err.message
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

