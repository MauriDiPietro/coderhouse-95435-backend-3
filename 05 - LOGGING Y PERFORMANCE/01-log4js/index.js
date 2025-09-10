import log4js from "log4js";

log4js.configure({
  appenders: {
    consoleAppender: {
      type: "console",
    },
    fileAppender: {
      type: "file",
      filename: "./logs/test.log",
    },
  },
  categories: {
    default: {
      appenders: ["consoleAppender"],
      level: "trace",
    },
    dev: {
      appenders: ["consoleAppender"],
      level: "trace",
    },
    prod: {
      appenders: ["consoleAppender", "fileAppender"],
      level: "warn",
    },
  },
});

const ENV = process.env.ENV;

export const logger = log4js.getLogger(ENV);

// [TRACE, DEBUG, INFO, WARN, ERROR, FATAL]

// logger.level = "trace";

// const test = () => {
//   logger.trace("Entering cheese testing");
//   logger.debug("Got cheese.");
//   logger.info("Cheese is Comté.");
//   logger.warn("Cheese is quite smelly.");
//   logger.error("Error registrando usuario - Email invalido");
//   logger.fatal("Cheese was breeding ground for listeria.");
// };

// test();
