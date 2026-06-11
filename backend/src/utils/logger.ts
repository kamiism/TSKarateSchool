import winston from "winston";

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: "HH:mm:ss" }),
  winston.format.printf(
    (info) => `${info.timestamp} [${info.level}] ${info.message}`,
  ),
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
  new winston.transports.File({
    filename: "logs/all.log",
    level: "info",
  }),
];

const logger = winston.createLogger({
  level: "info",
  format,
  transports,
});

export default logger;
