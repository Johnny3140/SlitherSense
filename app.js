//DEPENDENCIES 
const express = require('express');
const app = express ();
const PORT = 3000;
const Reptile = require('/Users/Johnny/sei-821/projects/SlitherSense/SlitherSense/models/reptiles.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Mongoose connection
mongoose.connect('mongodb://127.0.0.1:27017/reptiles')
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo')
})
//VIEW ENGINE
app.set('view engine', 'ejs');


//MIDDLEWARE

app.use(bodyParser.urlencoded({ extended: true }));


//ROUTES (I.N.D.U.C.E.S


//INDEX ROUTE

app.get('/', async (req, res) => {
  try {
    const reptiles = await Reptile.find({}, 'Name');  
    res.render('index', { reptiles });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//NEW ROUTE



//DELETE ROUTE



// UPDATE ROUTE



//CREATE ROUTE 



// EDIT ROUTE 



// SHOW ROUTE 




app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`)
})