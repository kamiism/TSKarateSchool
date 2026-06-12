import winston from "winston";

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "HH:mm:ss" }),
  winston.format.printf(
    (info) => `${info.timestamp} [${info.level}] ${info.message}`,
  ),
);

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      format,
    ),
  }),
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
    format,
  }),
  new winston.transports.File({
    filename: "logs/all.log",
    level: "info",
    format,
  }),
];

const logger = winston.createLogger({
  level: "info",
  transports,
});

export default logger;
