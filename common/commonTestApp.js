// Runs all unit tests on the common suite of code
const Logger = require("./Logger");
const logger = new Logger();

logger.on("loggingEvent", (args) => {
  console.log(args);
});
logger.log("This is a log message");
