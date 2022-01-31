const express = require('express')
const app = express();
const morgan = require('morgan');
const createError = require('http-errors');
const AuthRoutes = require('./routes/Auth.routes');
const bodyParser = require('body-parser');
const {verifyAccessToken} = require('./helpers/jwt')
require('./helpers/database')
require('dotenv').config();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const PORT = process.env.PORT || 3000;
app.use("/auth", AuthRoutes)

app.use( verifyAccessToken, (req, res, next) => {
    // res.send({ verifyAccessToken: 'hello' })
    next()
})

app.get('/', (req, res, next) => {
    res.send({node:'hello'})
})


app.use(async (req, res, next) => {
    next(createError.NotFound())
});

app.use(async (err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        status: err.status || 500,
        message: err.message
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

