import express from "express";
import { rolesMiddleware } from "../middleware/roles-middleware.js";
import adminController from "../controller/admin-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

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
  "/api/admin/new-book",
  [authMiddleware, rolesMiddleware],
  adminController.addNewBook,
);

adminApi.post(
  "/api/admin/remove-book",
  [authMiddleware, rolesMiddleware],
  adminController.removeBook,
);

adminApi.post(
  "/api/admin/update-book",
  [authMiddleware, rolesMiddleware],
  adminController.updateBook,
);

adminApi.post(
  "/api/admin/update-user",
  [authMiddleware, rolesMiddleware],
  adminController.updateUser,
);

adminApi.get(
  "/api/admin/get-all-user",
  [authMiddleware, rolesMiddleware],
  adminController.getAllUser,
);

adminApi.post(
  "/api/admin/delete-user/:id",
  [authMiddleware, rolesMiddleware],
  adminController.deleteUser,
);

adminApi.post(
  "/api/admin/new-publisher",
  [authMiddleware, rolesMiddleware],
  adminController.addNewPublisher
)

adminApi.post(
  "/api/admin/new-genre",
  [authMiddleware, rolesMiddleware],
  adminController.addNewGenre
)

adminApi.get(
  "/api/admin/show-genre",
  [authMiddleware, rolesMiddleware],
  adminController.getAllGenre
)
adminApi.get(
  "/api/admin/show-publisher",
  [authMiddleware, rolesMiddleware],
  adminController.getAllPublisher
)

export { adminApi };
