module.exports={
  loginmodule:async function(app,loginclient,user,bcrypt){
    app.post("/auth/login",(req,res)=>{
      const {email, password} = req.body;
    
      console.log("Email Receivied =",email)
      console.log("Password Received =",password)
    
      const data = loginclient.signin(user,email,password)
      console.log(data[0])
    
      if(data[0]['email']==email){
          bcrypt.compare(password,data[0]['password']).then(value=>{
              console.log(value)
              if(value){
                  loginstatus=true;
                  res.render('dashboard',{staus:loginstatus})
                  return loginstatus
              }
              else{
                  return res.render('login', {
                      message: 'Incorrent Password'
                  });
              }
          })
      }
      
      
    })
    
  }
}