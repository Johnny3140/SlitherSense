const express = require('express');
const router = express.Router();
const Reptile = require('../models/reptiles');

// INDEX ROUTE
router.get('/reptiles', async (req, res) => {
  try {
    const reptiles = await Reptile.find({}, 'Name');
    res.render('index', { reptiles });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// NEW ROUTE
router.get('/reptiles/new', (req, res) => {
  res.render('new');
});

// DELETE ROUTE
router.delete('/reptiles/:id', async (req, res) => {
  try {
    await Reptile.findByIdAndDelete(req.params.id);
    res.redirect('/reptiles');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// UPDATE ROUTE
router.put('/reptiles/:id', async (req, res) => {
  try {
    const { Name, Hardiness, Tameability, Habitat, Diet, Image } = req.body;
    await Reptile.findByIdAndUpdate(req.params.id, { Name, Hardiness, Tameability, Habitat, Diet, Image });
    res.redirect(`/reptiles/${req.params.id}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// CREATE ROUTE
router.post('/reptiles', async (req, res) => {
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
router.get('/reptiles/:id/edit', async (req, res) => {
  try {
    const reptile = await Reptile.findById(req.params.id);
    res.render('edit', { reptile });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// SHOW ROUTE
router.get('/reptiles/:id', async (req, res) => {
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

module.exports = router;
