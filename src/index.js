const express = require("./app");
const { env, port, ip } = require("./config");
const { logger } = require("./utils").Logger.getInstance(env);

const app = express();

setImmediate(() => {
  app.listen(port, ip, () => {
    logger.info(
      `Express server listening on http://${ip}:${port}, in ${env} mode`
    ); // eslint-disable-line no-console
  });
});

module.exports = app;
