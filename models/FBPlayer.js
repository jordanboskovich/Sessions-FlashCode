// Importing Mongoose
import mongoose from 'mongoose';

// Creating the FBPlayer Schema
const fbPlayerSchema = new mongoose.Schema({
    playerName: {
        type: String,
        required: true,
        trim: true
    },
    playerNumber: {
        type: Number,
        required: true
    },
    yr: {
        type: Number,
        required: true
    },
    receptions: {
        type: Number,
        default: 0
    },
    recYds: {
        type: Number,
        default: 0
    },
    rushes: {
        type: Number,
        default: 0
    },
    rushYds: {
        type: Number,
        default: 0
    },
    passAttempts: {
        type: Number,
        default: 0
    },
    passCompletions: {
        type: Number,
        default: 0
    },
    passYds: {
        type: Number,
        default: 0
    },
    rushTDs: {
        type: Number,
        default: 0
    },
    recTDs: {
        type: Number,
        default: 0
    },
    passTDs: {
        type: Number,
        default: 0
    },
    intsThrown: {
        type: Number,
        default: 0
    },
    intsMade: {
        type: Number,
        default: 0
    },
    sacks: {
        type: Number,
        default: 0
    },
    tackles: {
        type: Number,
        default: 0
    },
    passDefenses: {
        type: Number,
        default: 0
    },
    defTDs: {
        type: Number,
        default: 0
    }
});

// Creating the FBPlayer model
const FBPlayer = mongoose.model('FBPlayer', fbPlayerSchema);

// Exporting the model
export default FBPlayer;
