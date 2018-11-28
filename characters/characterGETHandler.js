/*
** CharacterGETHandler -- handles GET requests from the database
*/

// Require statements
const mongoose = require("mongoose");

// Character model.  The db schema is defined in DBModule
const Character = mongoose.model("Character");

// Class definition
class CharacterGETHandler {

  constructor(db) {
    this.db = db;
    this.searchCriteria = {};
  }


  // Converts the criteria passed in on the params or body into a mongoose DB query object.
  // @param res {Express.Response} response object from the express API call
  parseSearchCriteria(req) {
    if (!req.params._id) {
      this.searchCriteria = req.query;
    }
    else {
      this.searchCriteria = { "_id": req.params._id };
    }
  }


  // Asynchronously queries the mongo DB via the character model and then sends results back.
  //   Will send back status 404 -- not found, if nothing is returned.  
  // @param res {Express.Response} response object from the express API call
  async dbGet(res) {
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


  // Calls the search criteria parser and the DB fetch method
  // @param req {Express.Request} request object from the express API call
  // @param res {Express.Response} response object from the express API call
  getCharacter(req, res) {
    this.parseSearchCriteria(req);
    global.logger.log("getCharacter() is using search criteria: " +
      JSON.stringify(this.searchCriteria));

    // Asynchronously fetch the data and send it back via response object.
    this.dbGet(res);
  }

}

// Exports the CharacterGETHandler class
module.exports = CharacterGETHandler;
