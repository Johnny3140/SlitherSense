//DEPENDENCIES 
const express = require('express');
const app = express ();
const PORT = 3000;
const Reptile = require('./models/reptiles');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Mongoose connection
mongoose.connect('mongodb://127.0.0.1:27017/reptiles', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

// VIEW ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// ROUTES (Controllers)
const reptilesController = require('./controllers/reptilesController');
app.use(reptilesController);


//LANDING ROUTE FOR RENDER
app.get("/",(req,res)=>{
  res.render('index.ejs',
  )
})
// Listening Port
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});