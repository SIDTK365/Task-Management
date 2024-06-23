const mongoose = require("mongoose");
const connectDB = async () => {
  const mongoURL = process.env.MONGO_URL;
  try {
    const response = await mongoose.connect(mongoURL);

    if (response) {
      console.log(`MongoDB Connected to ${response.connection.host}`);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
