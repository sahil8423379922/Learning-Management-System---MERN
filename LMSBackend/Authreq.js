const { default: mongoose } = require("mongoose");

module.exports = {
  authreq: function(app) {
    // Creating model
    // Model for User Login
    const UserAuth = new mongoose.Schema({
      email: String,
      password: String
    });

    const loginmodel = mongoose.model('lmslogin', UserAuth);

    // Route to handle POST request
    app.post('/auth/login', (req, res) => {
      const data = req.body;
      console.log('Received data from React:', data);
      
      // Create a new document using the received data
      let sendifo = new loginmodel(data);

      // Save the document to the database
      sendifo.save()
        .then(savedDoc => {
          console.log('Data saved successfully:', savedDoc);
          res.send('Data received and saved successfully');
        })
        .catch(error => {
          console.error('Error saving data:', error);
          res.status(500).send('Error saving data');
        });
    });
  }
};
