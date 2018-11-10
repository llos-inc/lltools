/* 
** This is the main server app for all of the lltools services
*/

// Require statements
const express = require("express");
const DBModule = require("./dbModule.js");
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

// Start up the database connection
const dbModule = new DBModule();
dbModule.dbConnect()
  .catch((err) => console.error("Could not connect", err));

// Router classes for the various service sets
const cServRouter = new CharacterServiceRouter();

// Express app setup
const app = express();
app.use(express.json());  // allows JSON to parse request bodies

// Now initialize the individual listeners on the service routers
cServRouter.setRouteHandlers(app, dbModule);

// Finally, start the server by listening on the desired port
const server = app.listen(port, () => {
  logger.log(`Welcome to the LLTools Server, Version ${VERSION} (${VERSION_DATE}).`);
  logger.log(`Listening on Port ${port}`);
});

// Listener for SIGINT signal (CTRL-C) to try to exit gracefully
process.on('SIGINT', async function() {
  logger.log("Caught a SIGINT -- Exiting.");
 
  try {
    const dbDisconnectState = await dbModule.dbDisconnect();
  }
  catch (err) {
    logger.log("Error closing server gracefully!  Error:" + err.message);
  }
 
  server.close(); 
  process.exit(0);
});