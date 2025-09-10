import { logger } from "./index.js";

try {
   //------------ 
} catch (error) {
    logger.error(error);
    throw new Error(error)
}

logger.trace("Entering cheese testing");
logger.debug("Got cheese.");
logger.info("Cheese is Comté.");
logger.warn("Cheese is quite smelly.");
logger.fatal("Cheese was breeding ground for listeria.");
