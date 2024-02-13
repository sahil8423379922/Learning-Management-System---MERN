module.exports={
  addmodule:async function(newmodule,name,res){

    try {
      const module = new newmodule({
        name:name
      });
      const addmodule = await module.save();

      //Fetch all the upcoming modules
      const lmsmodules = await newmodule.find();
      var modulename=[]
      lmsmodules.map((value)=>{
        modulename.push(value.name)
      })

console.log(modulename)


      res.render('CreateModule',{modules:modulename});


  } catch (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
  }
    
    
  }

  
}