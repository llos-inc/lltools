/*
** CharacterServiceHandler.js
**   This will instantiate a handler object based on the route (CharacterGETHandler, et al)
**   and send the results of that object back to the response object.  It will also do input
**   validation via JOI for new/update.
*/

// Require statements
const Joi = require("joi");
const CharacterGETHandler = require("./characterGETHandler");
const CharacterPOSTHandler = require("./characterPOSTHandler");

// Class constants

// Class definition
class CharacterServiceHandler {

  constructor(db) {
    this.db = db;
  }
  
  getCharacter(req, res) {
    new CharacterGETHandler(this.db).getCharacter(req, res);
  }

  updateCharacter(req, res) {
    global.logger.log("updateCharacter() called on CharacterServiceHandler");
  }

  newCharacter(req, res) {
    new CharacterPOSTHandler(this.db).postCharacter(req, res);
  }

  deleteCharacter(req, res) {
    global.logger.log("deleteCharacter() called on CharacterServiceHandler");
  }
}

module.exports = CharacterServiceHandler;