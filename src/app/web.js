import express from "express";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { publicApi } from "../router/public-api.js";
import rateLimit from "express-rate-limit";
import { adminApi } from "../router/admin-api.js";

export const web = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});


/**
 * Middleware untuk menangani request JSON dan melakukan rate limiting.
 *
 * - `express.json()`: Middleware untuk parse body JSON dari request.
 * - `limiter`: Middleware untuk membatasi jumlah request dari IP yang sama dalam waktu tertentu.
 *
 * @type {express.Application}
 */
web.use(express.json());
web.use(limiter);

/**
 * Menggunakan router untuk Public API.
 * Public API adalah bagian dari aplikasi yang dapat diakses oleh pengguna tanpa autentikasi.
 *
 * @see {@link ../router/public-api.js} Modul untuk mendefinisikan route public API.
 */
web.use(publicApi);

/**
 * Menggunakan router untuk Admin API.
 * Admin API adalah bagian dari aplikasi yang memerlukan autentikasi dan hak akses admin.
 *
 * @see {@link ../router/admin-api.js} Modul untuk mendefinisikan route admin API.
 */
web.use(adminApi);

/**
 * Menambahkan middleware untuk menangani error.
 *
 * Middleware ini menangani error yang terjadi pada setiap request dan memberikan respons yang sesuai.
 *
 * @see {@link ../middleware/error-middleware.js} Modul untuk menangani error.
 */
web.use(errorMiddleware);
