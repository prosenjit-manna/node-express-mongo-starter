import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";
import { appEnv } from "../env.js";

/**
 * Creates and configures a Winston logger with daily rotating file transport.
 */
const loggerTransports = [];

if (process.env.NODE_ENV === "development") {
  loggerTransports.push(new transports.Console()); // Logs to console only in development mode
}
  loggerTransports.push(
    new transports.DailyRotateFile({
      filename: "log/application-%DATE%.log", // Daily log files
      datePattern: "YYYY-MM-DD",
      maxSize: "20m", // Maximum size of each log file
      maxFiles: "14d", // Keep logs for 14 days
    })
  );

const logger = createLogger({
  level: "info", // Log level: info, warn, error, etc.
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(
      ({ timestamp, level, message }) =>
        `${timestamp} [${level.toUpperCase()}]: ${message}`
    )
  ),
  transports: loggerTransports,
});

/**
 * Middleware to log request and response details.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {Function} next - The next middleware function.
 */
export function requestResponseLogger(req, res, next) {
  const { method, url, headers, body } = req;
  const startTime = Date.now();

  if (appEnv.NODE_ENV === 'development') {
    logger.info(`Request: ${method} ${url}`);
    logger.info(`Headers: ${JSON.stringify(headers)}`);
    if (Object.keys(body).length > 0) {
        logger.info(`Body: ${JSON.stringify(body)}`);
    }
  }
  
  
  

  // Capture the response body
  const originalSend = res.send;
  let responseBody;
  res.send = function (body) {
    responseBody = body;
    return originalSend.apply(this, arguments);
  };

  res.on("finish", () => {
    const { statusCode, statusMessage } = res;
    const responseTime = Date.now() - startTime;
    logger.info(`Response: ${statusCode} ${statusMessage} - ${responseTime}ms`);

    if (appEnv.NODE_ENV === 'development') {
      logger.info(`Response Body: ${responseBody}`);
    }
  });

  next();
}

export default logger;
