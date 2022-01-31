const mongoose = require("mongoose");

const mongodb_uri = `mongodb+srv://daud13:${process.env.MONGO_DB_PASS}@cluster0.lucj8.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;

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
