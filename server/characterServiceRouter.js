/*
** Router class for character services
*/

// Class constants
const CHARACTER_SERVICES_ROUTE = "/api/characters";

class CharacterServiceRouter {

  // @param app {Express} reference to the Express object from main server app 
  setRoutes(app) {

    app.get(`${CHARACTER_SERVICES_ROUTE}`, (req, res) => {
      global.logger.log("Character services called");
    });

    app.get(`${CHARACTER_SERVICES_ROUTE}/:characterId`, (req, res) => {
      global.logger.log("Character services called with specific character ID");
    });
  }
}

module.exports = CharacterServiceRouter;
