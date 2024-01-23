import mongoose from 'mongoose';
import dotenv from 'dotenv';
import FBPlayer from './models/FBPlayer.js';

dotenv.config({ path: 'process.env' });

// Define the roster
const roster = [
    { playerName: 'Sofia Angelats', yr: 9, playerNumber: 1 },
    { playerName: 'Ella Bilu', yr: 11, playerNumber: 2 },
    { playerName: 'Luella Castaneda', yr: 11, playerNumber: 3 },
    { playerName: 'Adelaide Chow', yr: 10, playerNumber: 4 },
    { playerName: 'Ariana Epstein', yr: 11, playerNumber: 5 },
    { playerName: 'Siena Garrison', yr: 10, playerNumber: 6 },
    { playerName: 'Larkin Murray', yr: 9, playerNumber: 7 },
    { playerName: 'Esperanza Orozco-Carey', yr: 10, playerNumber: 8 },
    { playerName: 'Layla Rashid', yr: 9, playerNumber: 9 },
    { playerName: 'Amanda Shirreffs', yr: 10, playerNumber: 10 },
    { playerName: 'Alia Speciale', yr: 9, playerNumber: 11 },
    { playerName: 'Serafino Speciale', yr: 9, playerNumber: 12 },
    { playerName: 'Abigail Withers', yr: 9, playerNumber: 13 }
];

// Function to load roster
const loadRoster = async () => {
  try {
    // Check if any players exist
    const existingCount = await FBPlayer.countDocuments();
    if (existingCount === 0) {
      // No players exist, load the roster
      await FBPlayer.insertMany(roster);
      console.log('Roster loaded successfully!');
    } else {
      console.log('Roster already exists. No new players added.');
    }
  } catch (error) {
    console.error('Error loading roster:', error);
  } finally {
    // Close the Mongoose connection
    mongoose.connection.close();
  }
};

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    loadRoster();
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
