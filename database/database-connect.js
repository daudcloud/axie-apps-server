const mongoose = require("mongoose");

const mongodb_uri = process.env.MONGO_DB_URI;

const dbConnect = async () => {
  try {
    await mongoose.connect(mongodb_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected To DB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnect;
