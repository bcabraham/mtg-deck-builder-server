const { createLogger, format, transports } = require("winston");
const morgan = require("morgan");

const Logger = (function() {
  let instance = null;

  function createInstance(env) {
    let logger = null;
    let httpLogger = null;

    const decolorizedJson = format.combine(format.uncolorize(), format.json());

    const colorizedCli = format.combine(format.colorize(), format.cli());

    const stream = {
      write: (message, encoding) => {
        logger.info(message.substring(0, message.lastIndexOf("\n")));
      }
    };

    logger = createLogger({
      level: "info",
      transports: [
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        new transports.File({
          format: decolorizedJson,
          filename: "logs/error.log",
          level: "error"
        }),
        new transports.File({
          format: decolorizedJson,
          filename: "logs/debug.log",
          level: "debug"
        })
      ]
    });

    // If we're not in production then log to the `console` with the format:
    // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
    if (env === "development") {
      logger.add(
        new transports.Console({
          format: colorizedCli
        })
      );

      httpLogger = morgan("dev", { stream });
    } else {
      httpLogger = morgan("common", { stream });
    }

    return { logger, httpLogger };
  }

  return {
    getInstance: function(env) {
      if (!instance) {
        instance = createInstance(env);
      }
      return instance;
    }
  };
})();

module.exports = {
  Logger
};
