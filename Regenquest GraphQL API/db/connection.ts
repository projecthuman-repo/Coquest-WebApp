import CONFIG from "@/config";
import mongoose from "mongoose";
import("dotenv/config");
// Connection options (optional)

class DBConnection {
  static instance: DBConnection | null = null;
  connection: mongoose.Connection;

  static async init(connectionUri = CONFIG.DATABASE_CONNECTION) {
    await this.getConnection(connectionUri).asPromise();
    console.log(`Connected to the cluster!`);
  }

  static getConnection(connectionUri = CONFIG.DATABASE_CONNECTION) {
    if (!this.instance) {
      let connection = mongoose.createConnection(connectionUri);
      this.instance = new DBConnection(connection);
    }
    return this.instance.connection;
  }

  constructor(connection: mongoose.Connection) {
    this.connection = connection;
  }
}

const regenDb = DBConnection.getConnection().useDb(CONFIG.REGENQUEST_DB_NAME);
const crossDb = DBConnection.getConnection().useDb(
  CONFIG.CROSSPLATFORM_DB_NAME,
);

export { DBConnection, regenDb, crossDb };
