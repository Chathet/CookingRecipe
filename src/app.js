const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser')
const path = require('path')
const mongodb = require('mongodb')

const mongoClient = mongodb.MongoClient

const app = express()
const port = 3000
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'CookingRecipe'
let userName
let userAge
let operation

app.use(express.static(path.join(__dirname, '/../public')))
app.use(cors())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())



mongoClient.connect(connectionURL, { useNewUrlParser: true }, (error,client)=>{
if(error)
{
  return console.log('Unable to connect to database!')
}})



app.get('/', (req, res) => {
  if(!userName){
    return res.send('No user')
  }
  res.send("Name: " + userName + " , " + "Age: " + userAge)
})

app.post('/',(req, res) => {
  if(!req.body.name || !req.body.age) {
      return res.send({
          message: "Name and age have to be provided"
      });
  }
  
  userName = req.body.name
  userAge = req.body.age
  operation = 'add'
  res.send("Name: " + userName + " , " + "Age: " + userAge)
})


app.delete('/',(req, res) => {
  userName = res.body.name
  userAge = req.body.age
  operation = 'delete'
  res.send("Deleted")
})

if(operation === 'add')
{
  db.collection('users').insertOne({
    name: userName,
    age: userAge
}, (error,result) => {
    if(error)
    {
        return console.log('Unable to insert user')
    }

    console.log(result.insertedId)
})
}


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})