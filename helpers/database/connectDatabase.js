const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex", true);
  mongoose.set("useUnifiedTopology", true);
  mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
      console.log("MongoDb Connection Successful");
    })
    .catch(err => console.log(new Error(err)));
};

module.exports = connectDatabase;
