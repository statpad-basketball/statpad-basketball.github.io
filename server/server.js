const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 2000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const client = new MongoClient('mongodb://localhost', { useUnifiedTopology: true });
client.connect()
  .then(() => {
    console.log('Connected to MongoDB');

    // Endpoint to fetch the data from MongoDB
    app.get('/rankings', async (req, res) => {
      try {
        // Get reference to the database and collection
        const db = client.db('statpad_db');
        const collection = db.collection('hof_rankings_example_csv');

        // Fetch the data from MongoDB
        const data = await collection.find({}).toArray();

        // Send the data as the API response
        res.json(data);
      } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });