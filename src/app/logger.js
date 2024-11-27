import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json({
    space: 1,
  }),
  transports: [new winston.transports.Console({})],
});
