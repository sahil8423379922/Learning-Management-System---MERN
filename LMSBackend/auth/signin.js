module.exports ={
  registermodule:async function(app,mclient,bcrypt,user){
    app.post("/auth/register", async (req, res) => {    
      const { name, email, password, password_confirm } = req.body;
     
      console.log("Auth Method invoked");
      console.log("Name Received =", name);
      console.log("Email Received =", email);
      console.log("Password Received =", password);
      console.log("Password Confirm =", password_confirm);
    
      const data =await mclient.mongo(user,email,bcrypt) 
      console.log("Data Received from the backend=",data.length)
    
      if(parseInt(data.length)){
          return res.render('register', {
              message: 'Email Already in Use'
          });
      }
      else{
          if (password !== password_confirm) {
              return res.render('register', {
                  message: 'Passwords do not match!'
              });
          } else {
              try {
                  const hashedPassword = await bcrypt.hash(password, 8);
                  const newUser = new user({
                      name: name,
                      email: email,
                      password: hashedPassword
                  });
                  const savedUser = await newUser.save();
                  res.render('login');
              } catch (error) {
                  console.error(error);
                  return res.status(500).send('Internal Server Error');
              }
          }
      }
    
    
      
    });
    
    
    
  }
}