/*
** PlayerGETHandler.js
**  Handles GET requests from the database
**  Also has a playerExists() convenience function
*/

// Require statements
const mongoose = require("mongoose");

// Player model.  The db schema is defined in DBModule
const Player = mongoose.model("Player");

// Class definition
class PlayerGETHandler {

  constructor(db) {
    this.db = db;
    this.searchCriteria = {};
  }

  // Convenience method to check if a player exists.  Must be called from an async block.
  //   @param playerID {number} is the ID of the player to check.
  async playerExists(playerID) {
    var result = false;

    const players = await Player.find({"playerID" : playerID});  
    if (players.length > 0) result = true;

    return result;
  }


}

// Exports the PlayerGETHandler class
module.exports = PlayerGETHandler;