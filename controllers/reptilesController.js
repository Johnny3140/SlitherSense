const express = require('express');
const app = express();
const Reptile = require('../models/reptiles');

app.get('/', (req, res) => {
    res.render('index.ejs'); 
  });
// INDEX ROUTE
app.get('/reptiles', async (req, res) => {
  try {
    const reptiles = await Reptile.find({}, 'Name');
    res.render('index', { reptiles }); 
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// NEW ROUTE
app.get('/reptiles/new', (req, res) => {
  res.render('new');
});

// DELETE ROUTE
app.delete('/reptiles/:id', async (req, res) => {
  try {
    await Reptile.findByIdAndDelete(req.params.id);
    res.redirect('/reptiles');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// UPDATE ROUTE
app.put('/reptiles/:id', async (req, res) => {
  try {
    const { Name, Hardiness, Tameability, Habitat, Diet, Image } = req.body;
    await Reptile.findByIdAndUpdate(req.params.id, { Name, Hardiness, Tameability, Habitat, Diet, Image });
    res.redirect(`/reptiles/${req.params.id}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// CREATE ROUTE
app.post('/reptiles', async (req, res) => {
  try {
    const { Name, Hardiness, Tameability, Habitat, Diet } = req.body;
    const newReptile = new Reptile({ Name, Hardiness, Tameability, Habitat, Diet });
    await newReptile.save();
    res.redirect('/reptiles');
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
    if (!reptile) {
      return res.status(404).send('Reptile not found');
    }
    res.render('show', { reptile });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = app;
