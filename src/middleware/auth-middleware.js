import { verifyJWT } from "../helpers/jwt-config.js";
import { logger } from "../app/logger.js";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ status: 401, message: "Token is required" });
  }

  try {
    const decodedToken = verifyJWT(token);

    const timeNow = Date.now() / 1000;
    if (timeNow > decodedToken.exp) {
      return res.status(401).json({ status: 401, message: "Token is expired" });
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: 401, message: "Invalid or expired token" });
  }
};

export { authMiddleware };
