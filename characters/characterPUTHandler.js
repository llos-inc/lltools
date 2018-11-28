/*
** CharacterPUTHandler -- handles PUT (update) requests from the database
*/

// Require statements
const mongoose = require("mongoose");
const Joi = require("joi");

// Character model -- db schema already defined in DBModule
const Character = mongoose.model("Character");

// Character validation schema
const joiCharacterSchema = require("./characterValidator");


// Class definition
class CharacterPUTHandler {

  constructor(db) {
    this.db = db;
  }


  // Saves character   
  // Will send back status 400 -- bad request -- on error
  // @param res {Express.Response} response object from the express API call
  // @param _id {Mongoose ObjectId} identifier of the character document to update
  // @param charData {object} contains the key:value pairs containing the data.  
  // Notes -- The {new: true} option tells the update method to return the modified
  //   document object, not the original (by default)
  async dbPut(res, _id, charData) {
    try {
      const result = await Character.findOneAndUpdate({ _id: _id }, charData, { new: true });
      console.log(result);
      res.send(result);
    }
    catch (err) {
      console.log(err.message);
      res.sendStatus(400, err);
    }
  }


  // Calls the validation logic and the DB put method
  // @param req {Express.Request} request object from the express API call
  // @param res {Express.Response} response object from the express API call
  putCharacter(req, res) {
    global.logger.log("putCharacter() called with the following data: \n" +
      JSON.stringify(req.body));

    if (!req.params._id) {
      res.sendStatus(404, "Unspecified _id");
      return;
    }

    const validateResult = Joi.validate(req.body, joiCharacterSchema);

    if (validateResult.error) {
      console.log(validateResult.error.details[0].message);
      res.sendStatus(400, validateResult.error.details[0].message);
      return;
    }

    // Call the put method, then return.
    this.dbPut(res, req.params._id, req.body);
  }


}



// Exports the CharacterGETHandler class
module.exports = CharacterPUTHandler;