var express = require('express');
var router = express.Router();
const { getCollection } = require('../models/db');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const testCollection = getCollection('test');
    const documents = await testCollection.find({}).toArray();
    res.redirect('signup');
  } catch (err) {
    next(err);
  }
});

router.get('/signin', function(req, res, next) {
  res.render("signin");
});

router.get('/signup', function(req, res, next) {
  res.render("signup");
});

// Updated quiz route to handle both registered users and guests
router.get('/quiz', async function(req, res, next) {
  const username = req.query.username;
  
  // Check if user is playing as guest (case-insensitive)
  if (!username) {
    return res.redirect('/signin');
  }
  
  if (username.toLowerCase() === 'guest') {
    return res.render('quiz', { 
      username: 'Guest',
      isGuest: true 
    });
  }
  
  try {
    // Validate that the username exists in the database for registered users
    const userCollection = getCollection('users');
    const user = await userCollection.findOne({ username: username });
    
    if (!user) {
      // Username doesn't exist in database, redirect to signin
      return res.render('signin', { 
        error: 'Invalid user session. Please sign in again.' 
      });
    }
    
    // Username is valid, render quiz page with username
    res.render('quiz', { 
      username: username,
      isGuest: false 
    });
    
  } catch (err) {
    console.error('Error validating user:', err);
    next(err);
  }
});

router.post("/signup/submit", async (req, res) => {
  console.log('Signup request received:', req.body); // Debug log
  const {username, email, password, confirmPassword} = req.body;

  // Backend validation
  const pattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
  if (!pattern.test(password)) {
    console.log('Password validation failed for:', password); // Debug log
    return res.render('signup', {
      error: 'Password must be at least 6 characters and include 1 uppercase letter and 1 special character.',
      username,
      email
    });
  }

  if (password !== confirmPassword) {
    console.log('Password mismatch'); // Debug log
    return res.render('signup', {
      error: 'Passwords do not match.',
      username,
      email
    });
  }

  const userCollection = getCollection('users');
  try {
    // Check if username already exists
    const existingUser = await userCollection.findOne({ username: username });
    if (existingUser) {
      console.log('Username already exists:', username); // Debug log
      return res.render('signup', {
        error: 'Username already exists. Please choose a different one.',
        username,
        email
      });
    }
    
    console.log('Inserting user into database...'); // Debug log
    await userCollection.insertOne({
      username,
      email,
      password
    });
    console.log('User inserted successfully, redirecting...'); // Debug log
    
    // Redirect to quiz with username after successful signup
    res.redirect(`/quiz?username=${encodeURIComponent(username)}`);
  } catch (e) {
    console.error('Database error:', e);
    res.status(500).send('Not able to save user info to db');
  }
});

router.post("/signin/submit", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userCollection = getCollection('users');
    const user = await userCollection.findOne({ username: username });
    
    if (!user) {
      return res.render("signin", { error: "User not found!" });
    }

    // Note: You should hash passwords in production
    if (user.password !== password) {
      return res.render("signin", { error: "Invalid password!" });
    }

    // Redirect with username in the URL query
    res.redirect(`/quiz?username=${encodeURIComponent(username)}`);
  } catch (err) {
    console.error('Signin error:', err);
    res.status(500).render("signin", { error: "Server error" });
  }
});

module.exports = router;