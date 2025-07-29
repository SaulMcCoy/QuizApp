const { MongoClient } = require('mongodb');
const dbURL = process.env.ATLAS_URI; //Hides the path inside of the .env file

let db;
async function connectToDB() {
  try {
    console.log("Connecting to DB...");
    const client = new MongoClient(dbURL);//Creates a new client based on url.
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db("cs355db");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

function getCollection(collectionName) {
  if (!db) {
    throw new Error('Database connection not established. Call connectToDB first.');
  }
  return db.collection(collectionName);
}

module.exports = {
  connectToDB,
  getCollection,
};
