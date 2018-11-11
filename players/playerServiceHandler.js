/*
** PlayerServiceHandler.js
**   This will instantiate a handler object based on the route (PlayerGETHandler, et al)
**   and send the results of that object back to the response object.  
*/

// Require statements
const PlayerGETHandler = require("./playerGETHandler");

// Class constants

// Class definition
class PlayerServiceHandler {

  constructor(db) {
    this.db = db;
  }

  async playerExists(playerID) {
    return new PlayerGETHandler(this.db).playerExists(playerID);
  }
  
  getPlayer(req, res) {
    global.logger.log("getPlayer() called on PlayerServiceHandler");
  }

  updatePlayer(req, res) {
    global.logger.log("updatePlayer() called on PlayerServiceHandler");
  }

  newPlayer(req, res) {
    global.logger.log("newPlayer() called on PlayerServiceHandler");
  }

  deletePlayer(req, res) {
    global.logger.log("deletePlayer() called on PlayerServiceHandler");
  }
}

module.exports = PlayerServiceHandler;