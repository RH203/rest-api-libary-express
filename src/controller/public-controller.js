import publicService from "../service/public-service.js";
import { logger } from "../app/logger.js";

/**
 * Controller untuk registrasi pengguna.
 *
 * Fungsi ini menangani request registrasi pengguna baru, dengan memanggil
 * `publicService.registrasi()` untuk memproses data registrasi. Setelah berhasil,
 * mengirimkan respons dengan status 200 dan pesan sukses.
 *
 * @param {express.Request} req - Request objek yang berisi data registrasi.
 * @param {express.Response} res - Response objek untuk mengirimkan hasil operasi ke client.
 * @param {express.NextFunction} next - Fungsi middleware untuk meneruskan error ke handler berikutnya.
 *
 * @returns {void} Mengirimkan respons JSON dengan status 200 jika berhasil, atau error jika gagal.
 */
const registrasi = async (req, res, next) => {
  try {
    const result = await publicService.registrasi(req);

    res.status(200).json({
      status: 200,
      message: result,
    });
  } catch (e) {
    next(e);
  }
};

/**
 * Controller untuk login pengguna.
 *
 * Fungsi ini menangani request login, dengan memanggil `publicService.login()`
 * untuk memproses data login. Setelah berhasil, mengirimkan respons dengan status 200
 * dan data pengguna yang berhasil login.
 *
 * @param {express.Request} req - Request objek yang berisi data login.
 * @param {express.Response} res - Response objek untuk mengirimkan hasil operasi ke client.
 * @param {express.NextFunction} next - Fungsi middleware untuk meneruskan error ke handler berikutnya.
 *
 * @returns {void} Mengirimkan respons JSON dengan status 200 dan data pengguna jika berhasil, atau error jika gagal.
 */
const login = async (req, res, next) => {
  try {
    const result = await publicService.login(req);
    res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

/**
 * Controller untuk mendapatkan daftar buku.
 *
 * Fungsi ini memanggil `publicService.getBookList()` untuk mendapatkan semua buku
 * yang tersedia. Setelah berhasil, mengirimkan respons dengan status 200 dan daftar buku.
 *
 * @param {express.Request} req - Request objek yang diterima dari client.
 * @param {express.Response} res - Response objek untuk mengirimkan hasil operasi ke client.
 * @param {express.NextFunction} next - Fungsi middleware untuk meneruskan error ke handler berikutnya.
 *
 * @returns {void} Mengirimkan respons JSON dengan status 200 dan data buku jika berhasil, atau error jika gagal.
 */
const getBookList = async (req, res, next) => {
  try {
    const result = await publicService.getBookList();

    res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

/**
 * Controller untuk mendapatkan buku berdasarkan ID.
 *
 * Fungsi ini mengambil ID buku dari parameter request, memanggil
 * `publicService.getBookById()` untuk mendapatkan buku berdasarkan ID.
 * Jika buku ditemukan, mengirimkan respons dengan status 200 dan data buku.
 * Jika tidak ditemukan, mengirimkan respons dengan status 404.
 *
 * @param {express.Request} req - Request objek yang berisi parameter ID buku.
 * @param {express.Response} res - Response objek untuk mengirimkan hasil operasi ke client.
 * @param {express.NextFunction} next - Fungsi middleware untuk meneruskan error ke handler berikutnya.
 *
 * @returns {void} Mengirimkan respons JSON dengan status 200 dan data buku jika berhasil, atau 404 jika tidak ditemukan.
 */
const getBookById = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(404).json({
        status: 404,
        message: "Not Found",
      });
      return;
    }

    const result = await publicService.getBookById(parseInt(id));

    res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

/**
 * Controller untuk meminjam buku.
 *
 * Fungsi ini menerima request untuk meminjam buku dan memanggil
 * `publicService.loanBook()` untuk memproses transaksi peminjaman.
 * Setelah berhasil, mengirimkan respons dengan status 200 dan data peminjaman.
 *
 * @param {express.Request} req - Request objek yang berisi data peminjaman buku.
 * @param {express.Response} res - Response objek untuk mengirimkan hasil operasi ke client.
 * @param {express.NextFunction} next - Fungsi middleware untuk meneruskan error ke handler berikutnya.
 *
 * @returns {void} Mengirimkan respons JSON dengan status 200 dan data peminjaman jika berhasil, atau error jika gagal.
 */
const loanBook = async (req, res, next) => {
  try {
    logger.info(req.body);
    const result = await publicService.loanBook(req);
    res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

/**
 * Controller untuk mengembalikan buku.
 *
 * Fungsi ini menerima request untuk mengembalikan buku dan memanggil
 * `publicService.returnBook()` untuk memproses pengembalian buku.
 * Setelah berhasil, mengirimkan respons dengan status 200 dan pesan pengembalian.
 *
 * @param {express.Request} req - Request objek yang berisi data pengembalian buku.
 * @param {express.Response} res - Response objek untuk mengirimkan hasil operasi ke client.
 * @param {express.NextFunction} next - Fungsi middleware untuk meneruskan error ke handler berikutnya.
 *
 * @returns {void} Mengirimkan respons JSON dengan status 200 dan pesan pengembalian jika berhasil, atau error jika gagal.
 */
const returnBook = async (req, res, next) => {
  try {
    const result = await publicService.returnBook(req);

    res.status(200).json({
      status: 200,
      data: result.message,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  registrasi,
  login,
  getBookList,
  getBookById,
  loanBook,
  returnBook,
};
