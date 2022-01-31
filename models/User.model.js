const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
        , lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
UserSchema.pre('save', async function (next) {
    try {
        console.log('before save');
        const salt = await bcrypt.genSalt(10);
        const data = await bcrypt.hash(this.password, salt);
        this.password = data;
        next()
    } catch (e) {
        console.log(e);
    }
});


UserSchema.methods.isValidPassword = async function (password) {

    try {
        return await bcrypt.compare(password, this.password)
    } catch (e) {
        throw error
    }
}


const User = mongoose.model('user', UserSchema);

module.exports = User;

