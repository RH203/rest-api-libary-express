import { web } from "./app/web.js";
import { logger } from "./app/logger.js";

web.listen(3000, () => {
  logger.info("App Start at port 3000");
});
