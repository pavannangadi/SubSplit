require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash'); // Add this line
const path = require('path');
require('./config/passport');
const paymentsRoute = require('./routes/payments');
const app = express();
const profileRoute = require('./routes/profile');
const { PythonShell } = require('python-shell');


// Database connection
mongoose.connect('mongodb://localhost:27017/suspsplit', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use((req, res, next) => {
  res.locals.errors = null; // Initialize errors for all views
  next();
});

// Passport and flash middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // Add this line





// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Make flash messages available to all views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.post('/predict', (req, res) => {
  const { price, slots } = req.body;
  console.log('Received data:', req.body);

  const options = {
    mode: 'json',
    pythonOptions: ['-u'],
    scriptPath: './',
    args: [price, slots]
  };

  PythonShell.run('predict_plan.py', options).then(results => {
    console.log('Prediction result from Python:', results);
    res.json(results[0]); // results is an array with one JSON object
  }).catch(err => {
    console.error('Prediction error:', err);
    res.status(500).json({ error: 'Prediction failed' });
  });
});

app.use('/', require('./routes/main'));
app.use('/groups', require('./routes/groups'));
app.use('/auth', require('./routes/auth'));
// ... other routes


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.use('/payments', paymentsRoute);


app.use('/profile', profileRoute);