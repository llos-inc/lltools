/*
** CharacterPOSTHandler -- handles POST (create) requests from the database
*/

// Require statements
const mongoose = require("mongoose");
const PlayerServiceHandler = require("../players/playerServiceHandler");
const Joi = require("joi");

// Character model -- db schema already defined in DBModule
const Character = mongoose.model("Character");

// Character validation schema
const joiCharacterSchema = require("./characterValidator");



// Class definition
class CharacterPOSTHandler {

  constructor(db) {
    this.db = db;
  }


  // Validates that the referenced player_id exists in the players table before
  //   saving.    
  // Will send back status 404 -- not found, if the player_id doesn't exist
  // @param res {Express.Response} response object from the express API call
  // @param charData {object} contains the key:value pairs containing the data.  
  async dbPost(res, charData) {
    try {
      // First, validate that there is such a player
      console.log("Validating that " + charData.player_id + " exists in the player collection.");
      const isPlayer = await new PlayerServiceHandler(this.db).playerExists(charData.player_id);

      if (!isPlayer)
        throw new Error(`Player ID ${charData.player_id} not found.`);

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


  // Calls the validation logic and the DB post method
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

// Exports the CharacterPOSTHandler class
module.exports = CharacterPOSTHandler;
