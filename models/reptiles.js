require("dotenv").config();

const mongoose = require('mongoose');

const reptileSchema = new mongoose.Schema({
  Name : String,
  Hardiness : Number,
  Tameability : Number,
  Habitat : String,
  Diet : String,
  Image : String,
});

module.exports = mongoose.model('Reptile', reptileSchema);
