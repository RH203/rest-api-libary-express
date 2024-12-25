import { validate } from "../validation/validation.js";
import {
  newBookValidation,
  removeBookValidationById,
  updateBookValidation,
} from "../validation/admin-validation.js";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {logger} from "../app/logger.js";

/**
 * Menambahkan buku baru ke dalam database.
 *
 * Menggunakan data yang diterima melalui body request untuk membuat buku baru. Jika buku dengan judul yang sama sudah ada,
 * maka akan mengembalikan kesalahan. Setiap genre buku akan ditambahkan ke dalam tabel penghubung antara genre dan buku.
 *
 * @async
 * @function addNewBook
 * @param {object} req - Request objek yang berisi data buku untuk ditambahkan
 * @param {object} res - Response objek yang akan mengirimkan hasil operasi ke client
 * @throws {ResponseError} 400 - Jika buku sudah ada
 * @returns {string} 200 - Pesan sukses buku berhasil ditambahkan
 */
const addNewBook = async (req, res) => {
  const bookData = validate(newBookValidation, req.body);
  const existingBook = await prismaClient.book.findFirst({
    where: { title: bookData.title },
  });
  if (existingBook) {
    throw new ResponseError(400, "Book already exists!");
  }
  const newBook = await prismaClient.book.create({
    data: {
      title: bookData.title,
      description: bookData.description,
      author: bookData.author,
      isbn: bookData.isbn,
      stok: bookData.stok,
      publisherBookId: bookData.publisherBookId,
    },
  });

  const genreData = bookData.genres.map(genreId => ({
    genreId: genreId,
    bookId: newBook.id,
  }))

  await prismaClient.genreBook.createMany({
    data: genreData
  })

  return "Book created successfully!";
};

/**
 * Memperbarui data buku yang sudah ada di database.
 *
 * Menggunakan data yang diterima melalui body request untuk memperbarui buku yang sudah ada. Jika buku dengan judul yang sama
 * sudah ada, maka akan mengembalikan kesalahan. Genre buku yang lama akan dihapus dan genre baru akan ditambahkan.
 *
 * @async
 * @function updateBook
 * @param {object} req - Request objek yang berisi data buku yang akan diperbarui
 * @param {object} res - Response objek yang akan mengirimkan hasil operasi ke client
 * @throws {ResponseError} 400 - Jika buku sudah ada
 * @returns {string} 200 - Pesan sukses buku berhasil diperbarui
 */
const updateBook = async (req, res) => {
  const data = validate(updateBookValidation, req.body);

  const existingBook = await prismaClient.book.findFirst({
    where: { title: data.title },
  });

  if (existingBook) {
    throw new ResponseError(400, "Book already exists!");
  }
  const updatedBook = await prismaClient.book.update({
    where: { id: data.id },
    data: {
      title: data.title,
      description: data.description,
      author: data.author,
      isbn: data.isbn,
      stok: data.stok,
      publisherBookId: data.publisherBookId,
    },
  });

  await prismaClient.genreBook.deleteMany({
    where: { bookId: updatedBook.id },
  });

  const genreData = data.genres.map(genreId => ({
    genreId: genreId,
    bookId: data.id
  }))

  await prismaClient.genreBook.createMany({
    data: genreData
  })

  return "Book updated successfully!";
};

/**
 * Menghapus buku dari database.
 *
 * Menggunakan data yang diterima melalui body request untuk menghapus buku berdasarkan ID. Jika buku tidak ditemukan,
 * maka akan mengembalikan kesalahan. Data waktu terakhir diperbarui akan disertakan saat penghapusan.
 *
 * @async
 * @function removeBook
 * @param {object} req - Request objek yang berisi ID buku yang akan dihapus
 * @param {object} res - Response objek yang akan mengirimkan hasil operasi ke client
 * @throws {ResponseError} 404 - Jika buku tidak ditemukan
 * @returns {string} 200 - Pesan sukses buku berhasil dihapus
 */
const removeBook = async (req, res) => {
  const data = validate(removeBookValidationById, req.body);

  logger.info(data)

  const isBookExist = await prismaClient.book.findFirst({
    where: { id: data.id },
  });

  if (!isBookExist) {
    throw new ResponseError(404, `Book doesn't exist`);
  }

  const deleteBook = await prismaClient.book.update({
    where: { id: data.id },
    data: {
      deleted_at: new Date(),
    },
  });

  return "Delete successfully";
};

// Edit user
// See all user
// Remove user

// Add new Publisher
// Add new Genre

export default {
  addNewBook,
  removeBook,
  updateBook,
};
