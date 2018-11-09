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
  }

  // @TODO this is going to need to be done via promise because it is an inherently async op
  dbFetch() {
    const data = {"charID" : 1, "playerID" : 1, "name" : "Glunt"};
    console.log("DBFetch says" + JSON.stringify(data));
    return data;
  }
  
  getCharacter(req, res) {
    global.logger.log("getCharacter() called on CharacterGETHandler");
    //const searchCriteria = getSearchCriteria(req);
    //global.logger.log("getCharacter() is using search criteria: " + JSON.stringify(searchCriteria));
    const charData = this.dbFetch();
    console.log(charData);
        
    return charData;
  }

}

module.exports = CharacterGETHandler;