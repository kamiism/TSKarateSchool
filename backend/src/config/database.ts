import mongoose from "mongoose";
import logger from "../utils/logger.ts";
import { MONGODB_DB_NAME, MONGODB_URI } from "./env.ts";

export const connectDb = async (): Promise<void> => {
  try {
    if (!MONGODB_DB_NAME || !MONGODB_URI) {
      logger.error("Mongodb variables are not set");
      process.exit(1);
    }

    const connection = await mongoose.connect(
      `${MONGODB_URI}/${MONGODB_DB_NAME}`,
      {
        retryReads: true,
        retryWrites: true,
      },
    );

    logger.info(
      `MongoDB connected successfully: HOST: ${connection.connection.host} PORT: ${connection.connection.port} NAME: ${connection.connection.name}`,
    );

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      logger.warn("Mongoose connection closed due to application termination");
      process.exit(0);
    });
  } catch (err) {
    logger.error(`Database connection failed: ${err}`);
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    logger.info("Database disconnected");
  } catch (err) {
    logger.error(`Error in disconnecting from database : ${err}`);
    throw err;
  }
};
