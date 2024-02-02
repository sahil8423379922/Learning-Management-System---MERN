const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


const app = express()
app.listen(4000, (res) => {
    console.log('Listening on port 4000')
})

app.use(express.static(`${__dirname}/public`))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
})) 

mongoose.connect('mongodb://localhost:27017/students')

const studentSchema = new mongoose.Schema({
  name: String,
  email: String
})
const Student = mongoose.model('Student', studentSchema)

app.post('/student', (req, res) => {
  let student = new Student(req.body);
  student.save()
      .then(doc => {
          res.send(doc)
          console.log(doc)
      })
      .catch(err => console.log(err))
})