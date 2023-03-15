const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const connectToMongoDB = (URL) => {
  mongoose
    .connect(URL)
    .then(() => console.log("connected to MongoDB"))
    .catch((err) => console.log(err));
};

module.exports = { connectToMongoDB };
