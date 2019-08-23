const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const api = require("./api");
const config = require("./config");
const { notFound, errorHandler } = require("./middleware");
const { httpLogger } = require("./utils").Logger.getInstance(config.env);

module.exports = args => {
  const app = express();

  // Middleware
  // app.use(express.static(__dirname + "/public"));
  app.use(express.json());
  app.use(httpLogger);

  if (config.env === "production" || config.env === "development") {
    app.use(cors());
    app.use(helmet());
  }

  // routes
  app.get("/", (req, res) => {
    res.status(200).send("<h3>server is up</h3>");
  });

  app.use("/api", api);
  app.use(notFound);
  app.use(errorHandler);

  return app;
};
