/*
** CharacterDELETEHandler -- handles DELETE requests from the database
*/

// Require statements
const mongoose = require("mongoose");

// Character model -- db schema already defined in DBModule
const Character = mongoose.model("Character");


// Class definition
class CharacterDELETEHandler {

  constructor(db) {
    this.db = db;
  }


  // Delete character   
  // Will send back status 400 -- bad request -- on error
  // @param res {Express.Response} response object from the express API call
  // @param _id {Mongoose ObjectId} identifier of the character document to update
  async dbDelete(res, _id) {
    try {
      const result = await Character.findOneAndDelete({ _id: _id });
      console.log(result);
      res.send(result);
    }
    catch (err) {
      console.log(err.message);
      res.sendStatus(400, err);
    }
  }


  // Calls the DB delete method
  // @param req {Express.Request} request object from the express API call
  // @param res {Express.Response} response object from the express API call
  deleteCharacter(req, res) {
    global.logger.log("deleteCharacter() called on " + req.params._id);

    if (!req.params._id) {
      res.sendStatus(404, "Unspecified _id");
      return;
    }

    // Call the put method, then return.
    this.dbDelete(res, req.params._id);
  }


}



// Exports the CharacterDELETEHandler class
module.exports = CharacterDELETEHandler;