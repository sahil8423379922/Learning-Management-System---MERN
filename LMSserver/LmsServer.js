const express = require('express')
const bodyParser = require('body-parser')

//creating server
const app = express()

//Alowing Cross domain Request
app.use(function(req, res, next) {
   
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

//fetching imformation from frontend
app.get('/api',(req,res)=>{
  res.send("From Server")
})

app.post('/api/login',(req,res)=>{
console.log(req.body)
  res.json({"message":"Form Submitted"})
})


//listenig server
app.listen(5000,()=>console.log("Server started at port 5000"))