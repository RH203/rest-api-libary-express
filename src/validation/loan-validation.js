import Joi from "joi";

/**
 * Validasi untuk peminjaman buku.
 *
 * Validasi ini memastikan bahwa data yang diterima untuk proses peminjaman buku sesuai dengan format yang benar.
 *
 * @constant {Object} loanValidation
 * @property {number} student_id - ID mahasiswa yang meminjam buku, wajib ada dan harus berupa angka
 * @property {number} book_id - ID buku yang akan dipinjam, wajib ada dan harus berupa angka
 * @property {string} notes - Catatan peminjaman buku yang bersifat opsional, panjang maksimal 100 karakter dan bisa kosong
 */
const loanValidation = Joi.object({
  student_id: Joi.number().required(),
  book_id: Joi.number().required(),
  notes: Joi.string().max(100).optional().allow(""),
});

/**
 * Validasi untuk pengembalian buku.
 *
 * Validasi ini memastikan bahwa data yang diterima untuk proses pengembalian buku sesuai dengan format yang benar.
 *
 * @constant {Object} returnValidation
 * @property {number} student_id - ID mahasiswa yang mengembalikan buku, wajib ada dan harus berupa angka
 * @property {number} book_id - ID buku yang akan dikembalikan, wajib ada dan harus berupa angka
 */
const returnValidation = Joi.object({
  student_id: Joi.number().required(),
  book_id: Joi.number().required(),
});

export { loanValidation, returnValidation };
