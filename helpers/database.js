// swMGLLdKXKZjuVDM
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://cluster0.spzma.mongodb.net/',
    { useNewUrlParser: true, useUnifiedTopology: true, user: 'admin', pass: 'swMGLLdKXKZjuVDM', dbName: 'auth', useCreateIndex: true })
    .then(Result => {
        console.log('mongoose connected');
    })
    .catch(Error => console.log(Error))

mongoose.connection.on('connected', () => {
    console.log('database connected');
})
mongoose.connection.on('error', (err) => {
    console.log(err.message);
})
mongoose.connection.on('disconnected', () => {
    console.log('database disconnected');
})
mongoose.connection.on('connecting', () => {
    console.log('database connecting');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
})