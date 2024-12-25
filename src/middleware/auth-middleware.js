import { verifyJWT } from "../helpers/jwt-config.js";
import { logger } from "../app/logger.js";

/**
 * Middleware untuk memverifikasi token JWT pada header authorization.
 *
 * Fungsi ini memeriksa keberadaan dan validitas token JWT yang dikirimkan
 * dalam header authorization. Jika token tidak ada, telah kedaluwarsa, atau tidak valid,
 * middleware ini akan mengembalikan respons dengan status 401. Jika token valid,
 * middleware ini akan melanjutkan eksekusi ke middleware berikutnya.
 *
 * @param {express.Request} req - Request objek yang berisi header authorization.
 * @param {express.Response} res - Response objek untuk mengirimkan hasil operasi ke client.
 * @param {express.NextFunction} next - Fungsi middleware untuk meneruskan eksekusi ke middleware berikutnya.
 *
 * @returns {void} Mengirimkan respons JSON dengan status 401 jika token tidak valid atau kedaluwarsa, atau melanjutkan ke middleware berikutnya jika valid.
 */
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
