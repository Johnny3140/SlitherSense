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
        Habitat: 'Arid/Desert',
        Diet: 'Insects and greens',
        Image: '/img/beginners-guide-keeping-bearded-dragon.jpg',      
    },
        {   
          Name: "Crested Gecko",
          Hardiness: 7.5,
          Tameability: 10,
          Habitat: "Tropical",
          Diet: ' Fruits and Insects',
          Image: '/img/depositphotos_39933213-stock-photo-portrait-of-a-caledonian-crested.jpg',
        },
        {
            Name: "Nile Monitor",
            Hardiness: 10,
            Tameability: 1,
            Habitat: "GrassLands, Swamps,Rivers, anywhere with a large body of water and available food",
            Diet:" anything from insects to small mammals or eggs",
            Image:"/img/Nile_monitor_(Varanus_niloticus)_2.jpg",
        },
        {
            Name: "leopard Gecko",
            Hardiness: 8,
            Tameability:10,
            Diet: "insects",
            Image:"/img/NVA_-_MASTER_-_BLOG_-_EXOTIC_-_LEOPARD_GECKO.webp",
        },
        {
            Name: "Central American Boa",
            Hardiness: 7,
            Tameability: 8,
            Diet:"Small to Large Rodents in Captivity, in the wild it varies more",
            Image:"/img/Boa_imperator,_Central_American_Boa_Constrictor_Tamaulipas.jpg",
        },
        {
            Name: "Ball Pyhton",
            Hardiness: 6.5,
            Tameability: 10,
            Diet:" Small to medium rodents",
            Image:"/img/how-big-do-ball-pythons-get.jpg"
        },
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

