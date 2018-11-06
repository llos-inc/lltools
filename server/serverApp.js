/* 
** This is the main server app for all of the lltools services
*/

// Require statements
const express = require("express");
const CharacterServiceRouter = require("./characterServiceRouter.js");
const Logger = require("../common/Logger");

// Set the port either to default 3000 or from environment variable
const port = process.env.lltoolsport || 3000;
const VERSION = "0.9.1";
const VERSION_DATE = "11/6/2018";

// Set up the logger
const logger = new Logger();
logger.registerLoggingCallback((message) => {
  console.log(message);
})
global.logger = logger;

// Router classes for the various service sets
const cServRouter = new CharacterServiceRouter();

// Express app setup
const app = express();
app.use(express.json());  // allows JSON to parse request bodies

// Now initialize the individual listeners on the service routers
cServRouter.setRoutes(app);

// Finally, start the server by listening on the desired port
app.listen(port, () => {
  logger.log(`Welcome to the LLTools Server, Version ${VERSION} (${VERSION_DATE}).`);
  logger.log(`Listening on Port ${port}`);
});