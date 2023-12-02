require("dotenv").config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI + "reptiles", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const reptileSchema = new mongoose.Schema({
  Name : String,
  Hardiness : Number,
  Tameability : Number,
  Habitat : String,
  Diet : String,
  Image : String,
});

module.exports = mongoose.model('Reptile', reptileSchema);
