import adminService from "../service/admin-service.js";

/**
 * Menambahkan buku baru melalui layanan admin.
 *
 * Fungsi ini menerima request untuk menambahkan buku baru, kemudian
 * memanggil layanan `adminService.addNewBook()` untuk memproses data
 * buku yang dikirim melalui request. Setelah itu, mengirimkan respons
 * dengan status 200 dan data buku yang berhasil ditambahkan.
 *
 * Jika terjadi error, error tersebut diteruskan ke middleware error handler.
 *
 * @param {express.Request} req - Request objek yang berisi data buku yang akan ditambahkan.
 * @param {express.Response} res - Response objek untuk mengirimkan hasil operasi ke client.
 * @param {express.NextFunction} next - Fungsi middleware untuk meneruskan error ke handler berikutnya.
 *
 * @returns {void} Mengirimkan respons JSON dengan status 200 jika berhasil, atau error jika gagal.
 */
const addNewBook = async (req, res, next) => {
  try {
    const result = await adminService.addNewBook(req);

    res.status(200).json({
      status: 200,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const removeBook = async (req, res, next) => {
  try {
    const result = adminService.removeBook(req)

    res.status(200).json({
      status: 200,
      data: result
    })
  } catch (error) {
    next(error);
  }

}

export default {
  addNewBook,
  removeBook
};
