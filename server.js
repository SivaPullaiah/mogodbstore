const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

const mongoURI = 'mongodb+srv://mangalisivapullaiah:9391993975@cluster0.tmdwkd0.mongodb.net/studentsDB?retryWrites=true&w=majority';
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}
connectToDatabase();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
app.post('/students', async (req, res) => {
  try {
    const { name, rollNumber } = req.body;

    const db = client.db('studentsDB');
    const collection = db.collection('students');

    const student = { name, rollNumber };
    await collection.insertOne(student);

    res.status(201).send('Student added successfully!');
  } catch (error) {
    console.error('Error creating student', error);
    res.status(500).send('An error occurred');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
