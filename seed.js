// seed.js

const mongoose = require('mongoose');
const Reptile = require('./models/reptiles');

mongoose.connect('mongodb://127.0.0.1:27017/reptiles', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', async () => {
  console.log('Connected to MongoDB');

  try {
    // Clear existing data
    await Reptile.deleteMany();

    // Seed data
    const reptilesData = [
      {
        Name: 'Bearded Dragon',
        Hardiness: 7.5,
        Tameability: 10,
        Habitat: 'Desert',
        Diet: 'Insects and greens',
        Image: 'projects/SlitherSense/SlitherSense/public/img/beginners-guide-keeping-bearded-dragon.jpg',
      },
      // Add more reptile data if needed
    ];

    const insertedData = await Reptile.insertMany(reptilesData);

    console.log('Seed data inserted successfully:', insertedData);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
});

