/*
** CharacterGETHandler -- handles GET requests from the database
*/

// Require statements
const mongoose = require("mongoose");

// Class constants

// Character schema 
const characterSchema = new mongoose.Schema({
  charID : Number,
  playerID : Number,
  name : String
});

// Character model
const Character = mongoose.model("Character", characterSchema);

// Class definition
class CharacterGETHandler {

  constructor(db) {
    this.db = db;
    this.searchCriteria = {};
  }

  // Converts the criteria passed in on the params or body into a mongoose DB query object.
  // @param req {Request} request object sent in from express
  parseSearchCriteria(req) {
    if (!req.params.charID) {
      this.searchCriteria = req.query;
    }
    else {
      this.searchCriteria = {"charID" : req.params.charID};
    }
  }

  async dbFetch(res) {
    try {
      const characters = await Character
        .find(this.searchCriteria);

      if (characters.length > 0)
        res.send(characters);
      else throw new Error("Unable to find character with those search criteria");
    }
    catch (err) {
      res.sendStatus(404, err);
    }
  }
  
  getCharacter(req, res) {
    global.logger.log("getCharacter() called on CharacterGETHandler with" + 
                      "\n  Params: " + JSON.stringify(req.params) + 
                      "\n  Body: " + JSON.stringify(req.body));
    this.parseSearchCriteria(req);
    global.logger.log("getCharacter() is using search criteria: " + 
                      JSON.stringify(this.searchCriteria));

    // Asynchronously fetch the data and send it back via response object.
    this.dbFetch(res);
  }

}

module.exports = CharacterGETHandler;