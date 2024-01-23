// Importing the FBPlayer model
import FBPlayer from '../models/FBPlayer.js';

// Example of using the model in a controller function
export const home = async (req, res) => {
  try {
    const players = await FBPlayer.find();
    res.render('index', { players });
  } catch (error) {
    // Error handling
  }
};

export const offense = async (req, res) => {
  try {
    const players = await FBPlayer.find({
      $or: [
        { receptions: { $gt: 0 } },
        { recYds: { $gt: 0 } },
        { rushes: { $gt: 0 } },
        { rushYds: { $gt: 0 } },
        { passAttempts: { $gt: 0 } },
        { passCompletions: { $gt: 0 } },
        { passYds: { $gt: 0 } },
        { rushTDs: { $gt: 0 } },
        { recTDs: { $gt: 0 } },
        { passTDs: { $gt: 0 } },
        { intsThrown: { $gt: 0 } }
      ]
    });

    res.render('offense', { players });
  } catch (error) {
    // Error handling
  }
};

export const defense = async (req, res) => {
  try {
    const players = await FBPlayer.find({
      $or: [
        { intsMade: { $gt: 0 } },
        { sacks: { $gt: 0 } },
        { tackles: { $gt: 0 } },
        { passDefenses: { $gt: 0 } },
        { defTDs: { $gt: 0 } }
      ]
    });

    res.render('defense', { players });
  } catch (error) {
    // Error handling
  }
};

export const loadGameLog = async (req, res) => {
  const players = await FBPlayer.find();
  res.render('gameLog', { players });
}

export const submitPlay = async (req, res) => { //EXTEND THIS 
  console.log(req.body);
  let player, player2, summary = "", playerName, rushes = 0, rushYds = 0, rushTDs = 0,
    passYds = 0, passCompletions = 0, passTDs = 0, playerName2, recYds = 0, receptions = 0, recTDs = 0, intsMade = 0, sacks = 0, tackles = 0, passDefenses = 0, defTDs = 0;
  
  if (req.body.playType === 'offense') {
    if (req.body.offensePlay === 'run') {
      playerName = req.body.runner; // Assuming 'runner' is the field for the runner's name
      rushYds = parseInt(req.body.runYards, 10);
      rushes = 1;
      rushTDs = req.body.touchdown === 'on' ? 1 : 0;
      
      summary += `Run by ${playerName} for ${rushYds} yards`;
      req.body.touchdown === 'on' ? summary += ' resulting in a touchdown.' : summary += '.';
    }
    if (req.body.offensePlay === 'pass'){
      playerName = req.body.passer; 
      passYds = parseInt(req.body.passYards, 10);
      passCompletions = 1;
      passTDs = req.body.touchdown === 'on' ? 1 : 0;
      
      playerName2 = req.body.receiver;
      recYds = parseInt(req.body.passYards, 10);
      receptions = 1;
      recTDs = req.body.touchdown === 'on' ? 1 : 0;
      
      summary += `Pass by ${playerName} to ${playerName2} for ${passYds} yards`;
      req.body.touchdown === 'on' ? summary += ' resulting in a touchdown.' : summary += '.';
    }
    }
  else if (req.body.playType === 'defense'){
    playerName = req.body.defender;
    
    if (req.body.defensiveAction === 'interception') intsMade = 1;
    if (req.body.defensiveAction === 'sack') sacks = 1;
    if (req.body.defensiveAction === 'tackle') tackles = 1;
    if (req.body.defensiveAction === 'passDefense') passDefenses = 1;
    
    defTDs = req.body.touchdown === 'on' ? 1 : 0;
      
    summary += `Defensive play by ${playerName}`;
    req.body.touchdown === 'on' ? summary += ' resulting in a touchdown.' : summary += '.';
    
  }

  try {
    // Find the player by name
    player = await FBPlayer.findOne({ playerName : playerName});
    if (playerName2) player2 = await FBPlayer.findOne({ playerName : playerName2 });

      console.log(player2);
    if (player) {
      // Update player stats
      player.rushes = (player.rushes || 0) + rushes;
      player.rushYds = (player.rushYds || 0) + rushYds;
      player.rushTDs = (player.rushTDs || 0) + rushTDs;
      player.passYds = (player.passYds || 0) + passYds;
      player.passCompletions = (player.passCompletions || 0) + passCompletions;
      player.intsMade = (player.intsMade || 0) + intsMade;
      player.passTDs = (player.passTDs || 0) + passTDs;
      player.sacks = (player.sacks || 0) + sacks;
      player.tackles = (player.tackles || 0) + tackles;
      player.passDefenses = (player.passDefenses || 0) + passDefenses;

      // Save the updated player
      await player.save();
    }
    if (player2) {
      // Update player stats
      player2.recYds = (player2.recYds || 0) + recYds;
      player2.receptions = (player2.receptions || 0) + receptions;
      player2.recTDs = (player2.recTDs || 0) + recTDs;

      await player2.save();
    }
  } catch (error) {
    console.error('Error updating player stats:', error);
    // Handle error (e.g., send a response indicating failure)
  }

  // Add flash message
  if (req.body.touchdown === 'on') req.flash('success', summary);
  else if (req.body.offensePlay === 'run') req.flash('danger', summary);
  else if (req.body.offensePlay === 'pass') req.flash('info', summary);
  else req.flash('warning', summary);
  
  // Redirect to game log or appropriate route
  res.redirect('/game-log');
};
