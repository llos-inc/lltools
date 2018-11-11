/*
** CharacterPOSTHandler -- handles POST (create) requests from the database
*/

// Require statements
const mongoose = require("mongoose");
const PlayerServiceHandler = require("../players/playerServiceHandler");
const Joi = require("joi");

// Character model -- db schema already defined in DBModule
const Character = mongoose.model("Character");

// JOI schema for new characters.  Note that charID is not included because the system will 
//   set it based on the characters listed for playerID.  
const joiCharacterSchema = {
  playerID : Joi.number().integer().greater(0).required(),
  name : Joi.string().min(3).max(60).required()
}

// Class definition
class CharacterPOSTHandler {

  constructor(db) {
    this.db = db;
  }


  // Uses "async and await" approach to lookup the playerID from the player table, then
  //   get the highest charID from said playerID (if it exists), set the new charID 
  //   appropriately, and then call save on the new one.  
  //   Will send back status 404 -- not found, if the playerID doesn't exist
  // @param res {Express.Response} response object from the express API call
  // @param charData {object} contains the key:value pairs containing the data.  
  async dbPost(res, charData) {
    try {
      // First, validate that there is such a player
      console.log("Validating that " + charData.playerID + " exists in the player collection.");
      const isPlayer = await new PlayerServiceHandler(this.db).playerExists(charData.playerID);

      if (!isPlayer)
        throw new Error(`Player ID ${charData.playerID} not found.`);

      // Look for all the characters assigned to playerID.  Sort descending by charID.
      const charactersByPlayer = 
        await Character.find({ "playerID" : charData.playerID})
                       .sort({charID : -1});

      // Set the next charID for that player (set to 1 if there are none)
      if (charactersByPlayer.length == 0) 
        charData.charID = 1;
      else
        charData.charID = charactersByPlayer[0].charID + 1;

      console.log("Creating a new character with ID " + charData.charID);
    
      const character = new Character(charData);  
      const result = await character.save();
      console.log(result);    
      res.send(result);
    }
    catch (err) {
      console.log(err.message);
      res.sendStatus(404, err);
    }
  }
  

  // Calls the validation logic and the DB write method
  // @param req {Express.Request} request object from the express API call
  // @param res {Express.Response} response object from the express API call
  postCharacter(req, res) {
    global.logger.log("postCharacter() called with the following data: \n" + 
                      JSON.stringify(req.body));
                       
    const validateResult = Joi.validate(req.body, joiCharacterSchema);

    if (validateResult.error) {
      console.log(validateResult.error.details[0].message);
      res.sendStatus(400, validateResult.error.details[0].message);
      return;
    }

    // Call the post method, then return.
    this.dbPost(res, req.body);
  }

}

// Exports the CharacterGETHandler class
module.exports = CharacterPOSTHandler;