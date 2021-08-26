const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
    name: String,
    age: Number
})

mongoose.model('users', userSchema)