var express = require('express');
var router = express.Router();
const { getCollection } = require('../models/db');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const testCollection = getCollection('test'); // Try to access a collection named 'test'
    const documents = await testCollection.find({}).toArray(); // Fetch all docs
    res.render('index', { title: 'MongoDB Test', data: documents });
  } catch (err) {
    next(err); // Pass errors to error handler
  }
});

router.get('/signin', function(req, res, next) {
  res.render("signin");
});

router.get('/signup', function(req, res, next) {
  res.render("signup");
});

router.post("/signup/submit", async (req, res) => {
  //Insert data into mongo db or throws an error.
  const userCollection = getCollection('users');//Get collection based on the uername
  try{
    await userCollection.insertOne(req.body);
    //Sends a notification to the user that their data has been saved.
    res.send('User infomation has been saved');
  }catch(e){
    res.status(500).send('Not able to save user info to db');
  }
});

router.post("/signin/submit", (req, res) => {
  //TODO
});

module.exports = router;
