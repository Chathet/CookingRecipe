const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser')
const path = require('path')
const mongodb = require('mongodb')
const mongoose = require('mongoose')
const user = require(path.join(__dirname, '../models/user.js'))

const mongoClient = mongodb.MongoClient

const app = express()
const port = 3000
const databaseName = 'CookingRecipe'
const connectionURL = 'mongodb://127.0.0.1:27017/' + databaseName

mongoose.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.static(path.join(__dirname, '/../public')))
app.use(cors())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.get('/api/users/:id', async (req, res) => {

  mongoose.model('users').findById(req.params.id,(err,user) => 
  {
    return res.status(200).json(user)
  })
})

app.post('/api/users',(req, res) => {
  if(!req.body.name || !req.body.age) {
      return res.send({
          message: "Name and age have to be provided"
      })
  }

  let newUser = new user.user({ name: req.body.name,age: req.body.age })
  newUser.save(function (err) {
    if (err) return handleError(err);
    // saved!
  })
  res.status(201).json(newUser)

})


app.delete('/api/users/:id',(req, res) => {
  mongoose.model('users').findByIdAndDelete(req.params.id,(err,user) => 
  {
    return res.status(204).json({})
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})