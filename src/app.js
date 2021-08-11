const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const path = require('path')

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, '/../public')))
app.use(cors())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

var userName
var userAge

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
  res.send("Name: " + userName + " , " + "Age: " + userAge)
})


app.delete('/',(req, res) => {
  userName = undefined
  userAge = undefined
  res.send("Deleted")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})