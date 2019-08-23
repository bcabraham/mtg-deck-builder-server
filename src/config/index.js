const path = require("path");
require("dotenv").config();

const env = process.env.NODE_ENV || "development";

module.exports = {
  env,
  root: path.join(__dirname, "../.."),
  port: process.env.PORT || 5000,
  ip: process.env.IP || "localhost",
  mongo: {
    uri: {
      test: `${process.env.MONGODB_URI}_Test`,
      dev: process.env.MONGODB_URI
    }
  }
};
