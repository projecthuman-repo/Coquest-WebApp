const mongoose = require("mongoose");
require("dotenv").config();

// Connection options (optional)
const dbOptions = {
  useNewUrlParser: true,
};

class DBConnection {
  static instance = null;

  static async init(connectionUri = process.env.DATABASE_CONNECTION) {
    await this.getConnection(connectionUri).asPromise();
    console.log(`Connected to the cluster!`);
  }

  static getConnection(connectionUri = process.env.DATABASE_CONNECTION) {
    if(!this.instance) {
      let connection = mongoose.createConnection(connectionUri, dbOptions);
      this.instance = new DBConnection(connection);
    }
    return this.instance.connection;
  }

  constructor(connection) {
    this.connection = connection;
  }
}

module.exports = {
  DBConnection,
  regenDb: DBConnection.getConnection().useDb(process.env.REGENQUEST_DB_NAME),
  crossDb: DBConnection.getConnection().useDb(process.env.CROSSPLATFORM_DB_NAME),
}
