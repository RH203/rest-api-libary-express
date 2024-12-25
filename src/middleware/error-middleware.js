import { ResponseError } from "../error/response-error.js";

/**
 * Middleware untuk menangani error dalam aplikasi.
 *
 * Middleware ini menangani error yang dilemparkan oleh aplikasi. Jika error yang
 * dilemparkan adalah instance dari `ResponseError`, status dan pesan error akan
 * dikirimkan sesuai dengan status yang diberikan. Jika error bukan `ResponseError`,
 * akan mengembalikan respons error dengan status 500 dan pesan error yang disediakan.
 *
 * @param {Error} err - Error yang terjadi selama eksekusi request.
 * @param {express.Request} req - Request objek yang berisi informasi permintaan.
 * @param {express.Response} res - Response objek untuk mengirimkan hasil operasi ke client.
 * @param {express.NextFunction} next - Fungsi untuk melanjutkan eksekusi middleware berikutnya.
 *
 * @returns {void} Mengirimkan respons error dalam bentuk JSON sesuai dengan status error.
 */
const errorMiddleware = (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseError) {
    res
      .status(err.status)
      .json({
        status: err.status,
        errors: err.message,
      })
      .end();
  } else {
    res
      .status(500)
      .json({
        status: 500,
        errors: err.message,
      })
      .end();
  }
};

export { errorMiddleware };
