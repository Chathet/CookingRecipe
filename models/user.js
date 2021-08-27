const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    age: Number
})

let user = mongoose.model('users', userSchema)

module.exports = {userSchema,user}