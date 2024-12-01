import { verifyJWT } from "../helpers/jwt-config.js";

const rolesMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ status: 401, message: "Token is required" })
      .end();
  }

  try {
    const decoded = verifyJWT(token);

    if (decoded.data.role === "Student") {
      next();
    } else {
      res.status(403).json({ status: 403, message: "Wrong role" }).end();
    }
  } catch (err) {
    res.status(401).json({ status: 401, message: "Invalid token" }).end();
  }
};

export { rolesMiddleware };
