// Importing Mongoose
import mongoose from 'mongoose';

// Creating the Game Schema
const gameSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    opponent: {
        type: String,
        required: true,
        trim: true
    },
    isHomeGame: {
        type: Boolean,
        required: true
    }
});

// Creating the Game model
const Game = mongoose.model('Game', gameSchema);

// Exporting the model
export default Game;
