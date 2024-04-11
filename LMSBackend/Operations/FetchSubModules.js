module.exports={
  fetchsubmodule:async function(res,submodule,req){
    const {data,name} = req.body;
      //const mainmodule = name;

      console.log("Name of the main module ="+data);
      console.log("Name of the Sub module ="+name);
      //console.log("Data received for sub module =" + data);
      var data1;

      try {
          
          const sub = await submodule.findOne({ name: data });
          console.log(sub)
          data1 =sub.subtopics
          res.render('submodule',{data,data1});
          console.log(data1)
          
          // if (!sub) {
          //     const newmod = {
          //         name: data,
          //         subtopics: [name] 
          //     };
          //     const newSubmodule = new submodule(newmod);
          //     await newSubmodule.save().then(value=>{
          //       res.render('submodule',{data});
          //     });
             
          // } else {
          //     sub.subtopics.push(name);
          //     await sub.save().then(value=>{
          //       res.render('submodule',{data});
          //     });
           
          // }
      } catch (error) {
          console.error('Error inserting or updating submodule:', error);
      }


  }
}