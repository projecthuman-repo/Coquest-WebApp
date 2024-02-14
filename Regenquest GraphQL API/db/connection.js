const mongoose = require('mongoose');
require('dotenv').config();

// Connection options (optional)
const dbOptions = {
  useNewUrlParser: true,
};

// Create a connection to the CrossPlatform database
const crossPlatformDatabase = mongoose.createConnection(
  process.env.DATABASE_CROSS_PLATFORM_CONNECTION,
  dbOptions
);

// Connect to the learningsystem database
const connectToRegenquestDatabase = async () => {
  try {
    // await regenquestDatabase.asPromise();
    await mongoose.connect(
      process.env.DATABASE_REGENQUEST_CONNECTION,
      dbOptions
    );

    console.log('Connected to the regenquest database');
  } catch (error) {
    throw new Error(`Connecting to the regenquest database: ${error}`);
  }
};

const connectToCrossPlatformDatabase = async () => {
  try {
    await crossPlatformDatabase.asPromise();
    console.log('Connected to the CrossPlatform database');
  } catch (error) {
    throw new Error(`Connecting to the CrossPlatform database: ${error}`);
  }
};

// Connect to all databases
const connectToDatabases = async () => {
  try {
    await connectToRegenquestDatabase();
    await connectToCrossPlatformDatabase();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  connectToDatabases,
  crossPlatformDatabase,
};
