import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

export default {
  // Express settings
  port: parseInt(process.env.PORT, 10),

  // MongoDB settings
  databaseURL: process.env.MONGODB_URI,

  // smoll.me settings
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  api: {
    version: "/v1",
    prefix: "/api",
  },
};
