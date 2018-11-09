/*
**
*/

// Require statements
const mongoose = require("mongoose");

// Class constants
const CONNECT_STRING = "mongodb://llos-user:llos-pwd@llos-zero-shard-00-00-mihrb.mongodb.net:27017," + 
                       "llos-zero-shard-00-01-mihrb.mongodb.net:27017," + 
                       "llos-zero-shard-00-02-mihrb.mongodb.net:27017/lltools" + 
                       "?ssl=true&replicaSet=LLOS-Zero-shard-0&authSource=admin&retryWrites=true";
const connectOptions = {useNewUrlParser: true};

class DBModule {

  dbConnect() { 
    return mongoose.connect(CONNECT_STRING, connectOptions)
      .then(global.logger.log("Successfully connected to MongoDB"));
  }


  dbDisconnect() {
    return mongoose.disconnect()
      .then(global.logger.log("Successfully disconnected from MongoDB"));;
  }
}

module.exports = DBModule;
