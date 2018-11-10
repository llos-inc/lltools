/*
** Router class for character services
*/

// Require statements
const CharacterServiceHandler = require("../characters/characterServiceHandler.js");

// Class constants
const CHARACTER_SERVICES_ROUTE = "/api/characters";

// Router class definition
class CharacterServiceRouter {

  // @param app {Express} reference to the Express object from main server app 
  // @param db {DBModule} reference to the DBModule object from main server app
  setRouteHandlers(app, db) {

    app.get(`${CHARACTER_SERVICES_ROUTE}`, (req, res) => {
      global.logger.log("GET on character services called");
      new CharacterServiceHandler(db).getCharacter(req, res);
    });

    app.get(`${CHARACTER_SERVICES_ROUTE}/:charID`, (req, res) => {
      global.logger.log("GET (charID) on character services called.");
      new CharacterServiceHandler(db).getCharacter(req, res);
    });

    app.put(`${CHARACTER_SERVICES_ROUTE}/:charID`, (req, res) => {
      global.logger.log("PUT (charID) on character services called.");
      new CharacterServiceHandler(db).updateCharacter(req, res);
    });

    app.post(`${CHARACTER_SERVICES_ROUTE}/:charID`, (req, res) => {
      global.logger.log("POST (charID) on character services called.");
      new CharacterServiceHandler(db).newCharacter(req, res);
    });

    app.delete(`${CHARACTER_SERVICES_ROUTE}/:charID`, (req, res) => {
      global.logger.log("DELETE (charID) on character services called.");
      new CharacterServiceHandler(db).deleteCharacter(req, res);
    });
  }
}

module.exports = CharacterServiceRouter;
