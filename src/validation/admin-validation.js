import Joi from "joi";

/**
 * Validasi untuk menambahkan buku baru.
 *
 * Validasi ini memastikan bahwa data yang diterima untuk buku baru memenuhi semua persyaratan,
 * termasuk validasi untuk id, judul, deskripsi, penulis, ISBN, ID penerbit, genre, dan stok.
 *
 * @constant {Object} newBookValidation
 * @property {Object} id - ID buku yang harus berupa angka dan wajib ada
 * @property {string} title - Judul buku yang harus berupa string dengan panjang maksimal 255 karakter dan wajib ada
 * @property {string} description - Deskripsi buku yang bersifat opsional dan maksimal 255 karakter
 * @property {string} author - Penulis buku yang harus berupa string dengan panjang maksimal 255 karakter dan wajib ada
 * @property {string} isbn - ISBN buku yang harus berupa string dengan panjang maksimal 255 karakter dan wajib ada
 * @property {number} publisherBookId - ID penerbit yang harus berupa angka dan wajib ada
 * @property {Array<number>} genres - Daftar ID genre yang harus berupa array angka dan wajib ada
 * @property {number} stok - Jumlah stok buku yang harus berupa angka dan minimal 0
 */
const newBookValidation = Joi.object({
  title: Joi.string().max(255).required(),
  description: Joi.string().max(255).optional(),
  author: Joi.string().max(255).required(),
  isbn: Joi.string().max(255).required(),
  publisherBookId: Joi.number().required(),
  genres: Joi.array().items(Joi.number()).required(),
  stok: Joi.number().min(0).required(),
});

/**
 * Validasi untuk memperbarui buku.
 *
 * Validasi ini memastikan bahwa data yang diterima untuk memperbarui buku memenuhi semua persyaratan yang sama
 * dengan validasi untuk buku baru, termasuk validasi untuk id, judul, deskripsi, penulis, ISBN, ID penerbit, genre, dan stok.
 *
 * @constant {Object} updateBookValidation
 * @property {Object} id - ID buku yang harus berupa angka dan wajib ada
 * @property {string} title - Judul buku yang harus berupa string dengan panjang maksimal 255 karakter dan wajib ada
 * @property {string} description - Deskripsi buku yang bersifat opsional dan maksimal 255 karakter
 * @property {string} author - Penulis buku yang harus berupa string dengan panjang maksimal 255 karakter dan wajib ada
 * @property {string} isbn - ISBN buku yang harus berupa string dengan panjang maksimal 255 karakter dan wajib ada
 * @property {number} publisherBookId - ID penerbit yang harus berupa angka dan wajib ada
 * @property {Array<number>} genres - Daftar ID genre yang harus berupa array angka dan wajib ada
 * @property {number} stok - Jumlah stok buku yang harus berupa angka dan minimal 0
 */
const updateBookValidation = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().max(255).required(),
  description: Joi.string().max(255).optional(),
  author: Joi.string().max(255).required(),
  isbn: Joi.string().max(255).required(),
  publisherBookId: Joi.number().required(),
  genres: Joi.array().items(Joi.number()).required(),
  stok: Joi.number().min(0).required(),
});

/**
 * Validasi untuk menghapus buku berdasarkan ID.
 *
 * Validasi ini memastikan bahwa ID buku yang akan dihapus adalah berupa angka dan wajib ada.
 *
 * @constant {Object} removeBookValidationById
 * @property {Object} id - ID buku yang akan dihapus, yang harus berupa angka dan wajib ada
 */
const removeBookValidationById = Joi.object({
  id: Joi.number().required(),
});

const updateUserValidation = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().max(255).required(),
  email: Joi.string().max(255).required().email(),
  role: Joi.string().valid("Admin", "Student").required(),
  gender: Joi.string().valid("Male", "Female").required(),
});

export {
  newBookValidation,
  removeBookValidationById,
  updateBookValidation,
  updateUserValidation,
};
