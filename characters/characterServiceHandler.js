/*
** CharacterServiceHandler.js
**   This will instantiate a handler object based on the route (CharacterGETHandler, et al)
**   and send the results of that object back to the response object.  
*/

// Require statements
const CharacterGETHandler = require("./characterGETHandler");
const CharacterPOSTHandler = require("./characterPOSTHandler");
const CharacterPUTHandler = require("./characterPUTHandler");
const CharacterDELETEHandler = require("./characterDELETEHandler");

// Class definition
class CharacterServiceHandler {

  constructor(db) {
    this.db = db;
  }

  getCharacter(req, res) {
    new CharacterGETHandler(this.db).getCharacter(req, res);
  }

  updateCharacter(req, res) {
    new CharacterPUTHandler(this.db).putCharacter(req, res);
  }

  newCharacter(req, res) {
    new CharacterPOSTHandler(this.db).postCharacter(req, res);
  }

  deleteCharacter(req, res) {
    new CharacterDELETEHandler(this.db).deleteCharacter(req, res);
  }
}

module.exports = CharacterServiceHandler;
