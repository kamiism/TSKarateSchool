import app from "./app.js";
import { PORT } from "./config/env.ts";
import logger from "./utils/logger.ts";

const startServer = async () => {
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};

startServer();
