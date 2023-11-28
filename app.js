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

app.get('/reptiles', async (req, res) => {
  try {
    const reptiles = await Reptile.find({}, 'Name');
    res.render('index', { reptiles });
  } catch (err) {
    res.status(500).send(err.message);
  }
});
//NEW ROUTE
app.get('/reptiles/new', (req, res) => {
  res.render('new'); 
});



//DELETE ROUTE
app.delete('/reptiles/:id', async (req, res) => {
  try {
    await Reptile.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// UPDATE ROUTE
app.put('/reptiles/:id', async (req, res) => {
  try {
    const { Name, Hardiness, Tameability, Habitat, Diet } = req.body;
    await Reptile.findByIdAndUpdate(req.params.id, { Name, Hardiness, Tameability, Habitat, Diet });
    res.redirect(`/reptiles/${req.params.id}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


//CREATE ROUTE 
app.post('/reptiles', async (req, res) => {
  try {
    // Retrieve data from the form submission
    const { Name, Hardiness, Tameability, Habitat, Diet } = req.body;

    // Create a new reptile in the database
    const newReptile = new Reptile({ Name, Hardiness, Tameability, Habitat, Diet });
    await newReptile.save();

    res.redirect('/'); // Redirect to the index route after adding a new reptile
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// EDIT ROUTE 
app.get('/reptiles/:id/edit', async (req, res) => {
  try {
    const reptile = await Reptile.findById(req.params.id);
    res.render('edit', { reptile });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// SHOW ROUTE 
app.get('/reptiles/:id', async (req, res) => {
  try {
    const reptile = await Reptile.findById(req.params.id);
    res.render('show', { reptile });
  } catch (err) {
    res.status(500).send(err.message);
  }
});



// Listening Port 
app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`)
})