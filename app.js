// Importing necessary modules
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import flash from 'connect-flash';

// Import env variables
import dotenv from 'dotenv'; 
dotenv.config({ path: 'process.env' });

// Initialize the express app
const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static('public'));

// Body-parser setup (Express now includes this functionality)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express-session setup
app.use(session({
    secret: 'your_secret_key', // Replace with your secret key
    resave: false,
    saveUninitialized: false
}));

// Connect-flash setup
app.use(flash());

// Middleware to make flash messages available to all views
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Import routes
import routes from './routes/routes.js';
app.use('/', routes);

// Define a port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

