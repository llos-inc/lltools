/*
** Common logging class
*/ 

// Require statements
const EventEmitter = require("events");

// Class constants
const LOGGING_EVENT = "loggingEvent";


// Logger class body
class Logger extends EventEmitter {

  registerLoggingCallback(callback) {
    this.on(LOGGING_EVENT, callback);
  }

  log(message) {
    this.emit(LOGGING_EVENT, message);
  }
}

module.exports = Logger;