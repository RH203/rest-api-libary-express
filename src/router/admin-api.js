import express from "express";
import { rolesMiddleware } from "../middleware/roles-middleware.js";
import adminController from "../controller/admin-controller.js";

const adminApi = new express.Router();

/**
 * Route untuk menambahkan buku baru oleh admin.
 *
 * Route ini hanya dapat diakses oleh pengguna dengan peran `Admin`. Middleware `rolesMiddleware` akan
 * memverifikasi token JWT yang dikirim dalam header `Authorization` dan memeriksa peran pengguna.
 * Jika peran pengguna adalah `Admin`, maka permintaan akan diteruskan ke controller `adminController.addNewBook`,
 * yang bertanggung jawab untuk menangani logika penambahan buku baru.
 *
 * @route POST /api/admin/new-book
 * @group Admin - Admin-specific routes
 * @param {object} req.body - Data buku yang akan ditambahkan
 * @param {object} res - Response objek untuk mengirimkan hasil operasi ke client
 * @param {function} next - Fungsi untuk melanjutkan eksekusi ke middleware berikutnya
 *
 * @returns {object} 200 - Data buku yang berhasil ditambahkan
 * @returns {object} 401 - Token tidak valid atau tidak ada
 * @returns {object} 403 - Peran tidak sesuai (harus Admin)
 */
adminApi.post(
  "api/admin/new-book",
  rolesMiddleware,
  adminController.addNewBook,
);

export { adminApi };
