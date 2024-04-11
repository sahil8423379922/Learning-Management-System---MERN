const express = require('express')
const bcrypt = require("bcryptjs")
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path');
const mclient=require('./MongoClient')
const loginmodule=require('./auth/login')
const regitermodule = require('./auth/signin')
const loginauth =require('./Loginauth')
const addmodule = require('./Operations/AddModule')
const updatemodule= require('./Operations/UpdateModule')
const deletemodule =require('./Operations/DeleteModals')
const createsubmodule = require('./Operations/CreateSubModule')
const fetchallmodule=require('./Operations/FetchSubModules')





const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var loginstatus = false;
app.use(function(req, res, next) {
   
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.set('view engine', 'hbs')

  app.get("/", (req, res) => {
    if(loginstatus)
    {
        res.render("dashboard")
    }
    else{
        res.render("login")
    }
   
  })

  app.get("/register", (req, res) => {
    res.render("register")
  })

 

 

  app.get("/addsub", (req, res) => {
    var results=['Introduction in Python','Data Type in Python']
    if(loginstatus)
    {
      res.render("CreateModule",{results:results})
    }
    else{
      res.render('login')
    }
  
  })

  app.post("/logout", (req, res) => {
    loginstatus =false
    res.render("login")
  })

  app.get("/logout", (req, res) => {
  
    res.render("login")
  })

  app.get("/auth/login",(req,res)=>{
    if(loginstatus)
    {
      res.render("dashboard")
    }
    else{
res.render('login')
    }
  })




//Route for module
  app.post("/addsub",async (req,res)=>{
    var modules=[]
    const lmsmodules =await newmodule.find();
 lmsmodules.map((value)=>{
  modules.push(value.name)
  })

    res.render("CreateModule",{modules})
  })

//Route to sub module
  app.post("/addsubmodule",async (req,res)=>{
    var data = req.body.data;
    console.log("Data received after form submission ="+data)
     res.render("submodule",{data})
  })

  app.post("/",(req,res)=>{
    res.render("dashboard")
  })

  app.get("/login", (req, res) => {
    res.render("login")
  })

  //Model for User Login
  const UserAuth = new mongoose.Schema({
    name: String,
    email:String,
    password:String
    
  })

  //Modal for new module
  const NewModule = new mongoose.Schema({
    name: String,
    
  })

  //Modal for sub Module
  const Submodule = new mongoose.Schema({
    name:String,
    subtopics: [String]
  })




  //Creating Instance of the Mongo DB
  const user = mongoose.model('User', UserAuth)
  const newmodule = mongoose.model('lms', NewModule)
  const submodule = mongoose.model('submodule',Submodule)

  




// app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
})) 


mongoose.connect('mongodb://localhost:27017/LMS')


const syllabusschema = new mongoose.Schema({
  title: String
  
})
const Topic = mongoose.model('Syllabus', syllabusschema)


//Sending data to mongo db
app.post('/topic', (req, res) => {


  let topic = new Topic(req.body);
  topic.save()
      .then(doc => {
        console.log(doc)
        res.redirect('/')
      })
      .catch(err => console.log(err))

      
})  

//Sending data to frontend
app.get("/api/data",async (req, res)=> {
    const topics = await newmodule.find();
    res.json(topics);
    
  });

  


  app.get("/lms/newmodule",async (req, res)=> {
   res.render('CreateModule')
    
  });

  //Calling login module here
  app.post("/auth/login",async (req,res)=>{
    
    if(loginstatus)
    {
res.render('dashboard')
    }
    else
    {
      const {email, password} = req.body;
  
    console.log("Email Receivied =",email)
    console.log("Password Received =",password)
  
    const data =await loginauth.loginauth(user,email)
    console.log(data[0]['email'])
    
    
  
    if(data[0]['email']==email){
        bcrypt.compare(password,data[0]['password']).then(value=>{
            console.log(value)
            if(value){
                loginstatus=true;
                res.render('dashboard',{staus:loginstatus})
                
            }
            else{
                return res.render('login', {
                    message: 'Incorrent Password'
                });
            }
        })
    }
    

    }


    
    
  })
  
  //console.log("After login status received ="+loginstatus)

  //Calling Register Module Here
  regitermodule.registermodule(app,mclient,bcrypt,user)


  //Logic to create new module
  app.post('/lms/newmodule',(req,res)=>{
    const {name} = req.body;
    //You have to render your list their also so that for first run it will show all the modules
  
    addmodule.addmodule(newmodule,name,res)
  })  


  //Logic to update modal
  app.post('/updatemodal',async (req,res)=>{
    const {data,updatename}= req.body;
  console.log("Data received after form sbmission ="+updatename);
    updatemodule.updatemodule(newmodule,data,res,updatename)



  })

  //Logic to Delete 
  app.post('/deletemodal',async (req,res)=>{
    const{data}= req.body;
    
    deletemodule.deletemodule(newmodule,data,res)


  })
 
  //End point to handel sub module
  app.post('/submodule',(req,res)=>{
    
    //Creating Sub Module
    createsubmodule.createsubmodule(res,submodule,req)

    //Fetching all the Sub Module
    //fetchallmodule.fetchsubmodule(res,submodule,req)



  })
  


  

  



app.listen(4000, (res) => {
    console.log('Listening on port 4000')
});