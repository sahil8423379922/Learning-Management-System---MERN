module.exports={
  updatemodule:async function(newmodule,data,res,updatename){
    console.log("Data which is avaialble ="+data);
    console.log("Data which is avaialble to update ="+updatename);
    try {
      const updatedModule = await newmodule.findOneAndUpdate({ name: data },{name:updatename}, { new: true }).then(value=>{
res.render('CreateModule')
      });
      
      
    } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
      throw error; // Throw the error to be caught by the caller
    }
  }
}