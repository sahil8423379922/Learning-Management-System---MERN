module.exports = {
  createsubmodule: async function (res, submodule, req) {
    const { data, name } = req.body;

    console.log("Name of the main module = " + data);
    console.log("Name of the Sub module = " + name);

    try {
      let sub = await submodule.findOne({ name: data });

      if (!sub) {
        const newmod = {
          name: data,
          subtopics: [name]
        };
        const newSubmodule = new submodule(newmod);
        await newSubmodule.save();
        sub = newSubmodule;
      } else {
        sub.subtopics.push(name);
        await sub.save();
      }

      // Retrieve subtopics after submodule creation/update
      const datamodals = sub.subtopics;
      console.log(datamodals);

      // Render the 'submodule' template with the retrieved data
      res.render('submodule', { data, datamodals });
    } catch (error) {
      console.error('Error inserting or updating submodule:', error);
    }
  }
};
