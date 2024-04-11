module.exports={
  deletemodule:async function(newmodule,data,res){
try {
      const deleteModule = await newmodule.deleteOne({ name: data }).then(async value=>{
        var modules=[]
  const lmsmodules =await newmodule.find();
     lmsmodules.map((value)=>{
      modules.push(value.name)
      })

res.render('CreateModule',{modules})
      });
      
      
    } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
      throw error; // Throw the error to be caught by the caller
    }
  }
}