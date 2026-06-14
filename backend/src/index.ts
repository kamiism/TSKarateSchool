import app from "./app.js";
import { connectDb } from "./config/database.ts";
import { PORT } from "./config/env.ts";
import logger from "./utils/logger.ts";

const startServer = async () => {
  try {
    await connectDb();

    const server = app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });

    process.on("unhandledRejection", (err: Error) => {
      logger.error(`UnhandledRejected : ${err.message}`);
      server.close(() => {
        process.exit(1);
      });
    });

    process.on("uncaughtException", (err: Error) => {
      logger.error(`UncaughtException : ${err.message}`);
      server.close(() => {
        process.exit(1);
      });
    });
  } catch (err) {
    logger.error(`Failed to start the server: ${err}`);
    process.exit(1);
  }
};

startServer();
