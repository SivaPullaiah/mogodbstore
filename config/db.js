const { MongoClient } = require('mongodb');

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

module.exports = { client, connectToDatabase };
