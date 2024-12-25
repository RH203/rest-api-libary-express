import { verifyJWT } from "../helpers/jwt-config.js";

/**
 * Middleware untuk memeriksa peran pengguna berdasarkan token JWT.
 *
 * Fungsi ini memverifikasi token JWT yang dikirim dalam header `Authorization` dan memeriksa
 * peran pengguna yang tercantum dalam payload token. Jika peran pengguna adalah `Admin`,
 * maka permintaan dilanjutkan ke middleware berikutnya. Jika peran tidak sesuai,
 * middleware ini mengembalikan respons dengan status 403. Jika token tidak ada atau tidak valid,
 * middleware ini mengembalikan respons dengan status 401.
 *
 * @param {express.Request} req - Request objek yang berisi header authorization.
 * @param {express.Response} res - Response objek untuk mengirimkan hasil operasi ke client.
 * @param {express.NextFunction} next - Fungsi middleware untuk melanjutkan eksekusi ke middleware berikutnya.
 *
 * @returns {void} Mengirimkan respons status 401 atau 403 jika token tidak valid atau peran tidak sesuai,
 * atau melanjutkan eksekusi ke middleware berikutnya jika peran sesuai.
 */
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

    if (decoded.data.role === "Admin") {
      next();
    } else {
      res.status(403).json({ status: 403, message: "Wrong role" }).end();
    }
  } catch (err) {
    res.status(401).json({ status: 401, message: "Invalid token" }).end();
  }
};

export { rolesMiddleware };
