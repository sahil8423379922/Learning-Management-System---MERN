module.exports={
  loginauth:async function(user,email){
    try {
      const filter = { email: email };
      const data = await user.find(filter);
      return data; // Return the fetched data
    } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
      throw error; // Throw the error to be caught by the caller
    }
  }
}