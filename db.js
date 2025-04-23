const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://GoFood-App:Ritu01%23%239ijn@cluster0.odz6agw.mongodb.net/GoFood?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
  try {
    // Connect to MongoDB using the provided URI
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("Connected to MongoDB successfully!");

    // Fetch data from the 'food_items' collection
    const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
    
    // Fetch data from the 'foodCategory' collection
    const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

    // Store the fetched data in global variables
    global.food_items = fetched_data;
    global.foodCategory = foodCategory;

    console.log("Food items and categories fetched and stored globally.");

  } catch (err) {
    console.log("--- Error connecting to MongoDB:", err);
  }
};

module.exports = mongoDB;
