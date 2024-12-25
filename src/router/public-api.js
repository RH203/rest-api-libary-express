import express from "express";
import publicController from "../controller/public-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const publicApi = new express.Router();

/**
 * Route untuk registrasi pengguna baru.
 *
 * Route ini digunakan untuk membuat akun pengguna baru. Data registrasi dikirimkan melalui body
 * permintaan dan diteruskan ke controller `publicController.registrasi` untuk diproses.
 *
 * @route POST /api/user/registrasi
 * @group Public - Public API routes
 * @param {object} req.body - Data pengguna yang akan didaftarkan
 * @param {object} res - Response objek untuk mengirimkan hasil operasi ke client
 *
 * @returns {object} 200 - Pesan sukses registrasi
 * @returns {object} 400 - Data tidak valid
 */
publicApi.post("/api/user/registrasi", publicController.registrasi);

/**
 * Route untuk login pengguna.
 *
 * Route ini digunakan untuk login pengguna dengan menggunakan kredensial yang telah didaftarkan.
 * Informasi login dikirimkan melalui query parameter dan diteruskan ke controller `publicController.login` untuk diproses.
 *
 * @route GET /api/user/login
 * @group Public - Public API routes
 * @param {object} req.query - Kredensial login (misalnya, email dan password)
 * @param {object} res - Response objek untuk mengirimkan hasil operasi ke client
 *
 * @returns {object} 200 - Data pengguna yang berhasil login
 * @returns {object} 401 - Kredensial tidak valid
 */
publicApi.get("/api/user/login", publicController.login);

/**
 * Route untuk melihat daftar buku yang tersedia.
 *
 * Route ini digunakan untuk mendapatkan daftar buku yang tersedia di sistem. Middleware `authMiddleware`
 * akan memeriksa apakah pengguna telah terautentikasi sebelum mengakses daftar buku.
 *
 * @route GET /api/book
 * @group Public - Public API routes
 * @param {object} req - Request objek yang berisi informasi permintaan.
 * @param {object} res - Response objek untuk mengirimkan hasil operasi ke client.
 * @param {function} next - Fungsi middleware untuk melanjutkan eksekusi.
 *
 * @returns {object} 200 - Daftar buku yang tersedia
 * @returns {object} 401 - Token tidak valid atau tidak ada
 */
publicApi.get("/api/book", authMiddleware, publicController.getBookList);

/**
 * Route untuk melihat detail buku berdasarkan ID.
 *
 * Route ini digunakan untuk mendapatkan informasi detail buku berdasarkan ID yang diberikan.
 * Middleware `authMiddleware` memastikan bahwa pengguna terautentikasi sebelum mengakses detail buku.
 *
 * @route GET /api/book/:id
 * @group Public - Public API routes
 * @param {number} id - ID buku yang ingin dilihat
 * @param {object} req - Request objek yang berisi parameter ID.
 * @param {object} res - Response objek untuk mengirimkan hasil operasi ke client.
 * @param {function} next - Fungsi middleware untuk melanjutkan eksekusi.
 *
 * @returns {object} 200 - Detail buku yang diminta
 * @returns {object} 404 - Buku tidak ditemukan
 * @returns {object} 401 - Token tidak valid atau tidak ada
 */
publicApi.get("/api/book/:id", authMiddleware, publicController.getBookById);

/**
 * Route untuk meminjam buku.
 *
 * Route ini digunakan untuk meminjam buku. Middleware `authMiddleware` memastikan bahwa pengguna
 * terautentikasi sebelum dapat meminjam buku. Data peminjaman dikirimkan melalui body permintaan.
 *
 * @route POST /api/book/borrow
 * @group Public - Public API routes
 * @param {object} req.body - Data peminjaman buku yang berisi informasi buku yang dipinjam
 * @param {object} res - Response objek untuk mengirimkan hasil operasi ke client
 * @param {function} next - Fungsi middleware untuk melanjutkan eksekusi
 *
 * @returns {object} 200 - Data peminjaman buku yang berhasil
 * @returns {object} 401 - Token tidak valid atau tidak ada
 */
publicApi.post("/api/book/borrow", authMiddleware, publicController.loanBook);


/**
 * Route untuk mengembalikan buku.
 *
 * Route ini digunakan untuk mengembalikan buku yang telah dipinjam. Middleware `authMiddleware` memastikan bahwa
 * pengguna terautentikasi sebelum dapat mengembalikan buku. Data pengembalian dikirimkan melalui body permintaan.
 *
 * @route POST /api/book/return
 * @group Public - Public API routes
 * @param {object} req.body - Data pengembalian buku yang berisi informasi buku yang dikembalikan
 * @param {object} res - Response objek untuk mengirimkan hasil operasi ke client
 * @param {function} next - Fungsi middleware untuk melanjutkan eksekusi
 *
 * @returns {object} 200 - Pesan sukses pengembalian buku
 * @returns {object} 401 - Token tidak valid atau tidak ada
 */
publicApi.post("/api/book/return", authMiddleware, publicController.returnBook);

export { publicApi };
