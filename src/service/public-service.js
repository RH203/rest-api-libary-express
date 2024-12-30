import { ResponseError } from "../error/response-error.js";
import { prismaClient } from "../app/database.js";
import bcrypt from "bcrypt";
import { Role } from "@prisma/client";
import { validate } from "../validation/validation.js";
import {
  loginUserValidation,
  registrationUserValidation,
} from "../validation/user-validation.js";
import { generateJWT } from "../helpers/jwt-config.js";
import { capitalizeWord } from "../helpers/string-helper.js";
import {
  loanValidation,
  returnValidation,
} from "../validation/loan-validation.js";
import { logger } from "../app/logger.js";

/**
 * Registrasi pengguna baru
 *
 * Fungsi untuk melakukan registrasi akun pengguna baru. Mengecek apakah email yang dimasukkan sudah ada.
 * Jika sudah ada, maka akan mengembalikan pesan kesalahan. Jika tidak, password akan di-hash dan akun pengguna
 * baru akan dibuat dengan data yang diterima dari body request.
 *
 * @async
 * @function registrasi
 * @param {object} req - Request objek yang berisi data pengguna yang akan didaftarkan
 * @param {object} res - Response objek yang akan mengirimkan hasil operasi ke client
 * @returns {Promise<object>} Data pengguna yang baru saja terdaftar
 * @throws {ResponseError} 400 - Jika email sudah terdaftar
 */
const registrasi = async (req, res) => {
  const data = validate(registrationUserValidation, req.body);

  const checkAccountDuplicate = await prismaClient.student.findUnique({
    where: { email: data.email },
  });

  if (checkAccountDuplicate) {
    throw new ResponseError(400, "email already exists!");
  }

  data.password = await bcrypt.hash(data.password, 10);
  // Capital nama
  data.name = capitalizeWord(data.name);

  const result = await prismaClient.student.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      role: Role.Student,
      gender: data.gender,
    },
  });

  if (!result) {
    throw new ResponseError(400, "Failed create account");
  }

  return "Account created successfully!";
};

/**
 * Login pengguna
 *
 * Fungsi untuk memverifikasi email dan password pengguna. Jika data yang dimasukkan salah,
 * maka akan mengembalikan pesan kesalahan. Jika berhasil, akan mengembalikan token JWT untuk otentikasi lebih lanjut.
 *
 * @async
 * @function login
 * @param {object} req - Request objek yang berisi data login pengguna
 * @param {object} res - Response objek yang akan mengirimkan hasil operasi ke client
 * @returns {Promise<string>} Token JWT untuk otentikasi pengguna
 * @throws {ResponseError} 400 - Jika email atau password salah
 */
const login = async (req, res) => {
  const data = validate(loginUserValidation, req.body);

  const account = await prismaClient.student.findFirst({
    where: { email: data.email },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      role: true,
      ban_status: true,
    },
  });
  if (!account) {
    throw new ResponseError(400, "Email or password is wrong!");
  }
  if (account.ban_status) {
    throw new ResponseError(
      404,
      "Account banned, for more information call CS.",
    );
  }

  const isPasswordSame = await bcrypt.compare(data.password, account.password);

  if (!isPasswordSame) {
    throw new ResponseError(400, "Email or password is wrong!");
  }

  return generateJWT(account.id, account.name, account.role);
};

/**
 * Get user detail by id
 */
const findUserById = async id => {
  if (!id) {
    throw new ResponseError(401, "User not found!");
  }

  const parseId = parseInt(id);

  const result = await prismaClient.student.findFirst({
    where: { id: parseId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      gender: true,
    },
  });

  if (!result) {
    throw new ResponseError(401, "User not found!");
  }

  return result;
};

/**
 * Mendapatkan daftar buku
 *
 * Fungsi untuk mengambil semua daftar buku yang tersedia. Buku yang sudah dihapus akan diabaikan,
 * dan informasi terkait genre serta penerbit buku akan ditambahkan.
 *
 * @async
 * @function getBookList
 * @param {object} req - Request objek yang berisi permintaan daftar buku
 * @param {object} res - Response objek yang akan mengirimkan hasil operasi ke client
 * @returns {Promise<object[]>} Daftar buku yang tersedia
 */
const getBookList = async (req, res) => {
  const data = await prismaClient.book.findMany({
    select: {
      id: true,
      title: true,
      author: true,
      description: true,
      isbn: true,
      stok: true,
      deleted_at: true,
      genres: {
        select: {
          genre: {
            select: {
              name: true,
            },
          },
        },
      },
      publisher: {
        select: {
          name: true,
        },
      },
    },
    where: {
      deleted_at: null,
    },
  });

  return data.map(book => ({
    id: book.id,
    title: book.title,
    author: book.author,
    description: book.description,
    isbn: book.isbn,
    stok: book.stok,
    genres: book.genres.map(genre => genre.genre.name),
    publisher: book.publisher?.name || "Unknown",
  }));
};

/**
 * Mendapatkan detail buku berdasarkan ID
 *
 * Fungsi untuk mengambil data detail buku berdasarkan ID. Jika buku tidak ditemukan atau sudah dihapus,
 * maka akan mengembalikan pesan kesalahan.
 *
 * @async
 * @function getBookById
 * @param {string} id - ID buku yang akan dicari
 * @returns {Promise<object>} Detail buku yang ditemukan
 * @throws {ResponseError} 400 - Jika buku tidak ditemukan atau sudah dihapus
 */
const getBookById = async id => {
  const data = await prismaClient.book.findFirst({
    where: { id: id },
    select: {
      id: true,
      title: true,
      author: true,
      description: true,
      isbn: true,
      stok: true,
      deleted_at: true,
      genres: {
        select: {
          genre: {
            select: {
              name: true,
            },
          },
        },
      },
      publisher: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!data || data.deleted_at === null) {
    throw new ResponseError(400, "No book found with id " + req.params.id);
  }

  return {
    id: data.id,
    title: data.title,
    author: data.author,
    description: data.description,
    isbn: data.isbn,
    stok: data.stok,
    genres: data.genres.map(genre => genre.genre.name),
    publisher: data.publisher?.name || "Unknown",
  };
};

// TODO: Melihat member lain yang aktif

/**
 * Meminjamkan buku
 *
 * Fungsi untuk meminjam buku. Mengecek apakah buku masih tersedia, apakah pengguna sudah meminjam buku yang sama,
 * dan apakah stok buku mencukupi. Jika semua validasi lulus, transaksi peminjaman akan diproses dan stok buku akan dikurangi.
 *
 * @async
 * @function loanBook
 * @param {object} req - Request objek yang berisi data peminjaman buku
 * @param {object} res - Response objek yang akan mengirimkan hasil operasi ke client
 * @returns {Promise<object>} Data peminjaman yang berhasil
 * @throws {ResponseError} 400 - Jika buku sudah dipinjam atau stok buku habis
 * @throws {ResponseError} 404 - Jika buku tidak ditemukan atau sudah dihapus
 */
const loanBook = async (req, res) => {
  const data = validate(loanValidation, req.body);

  logger.info(req.body);

  const checkBookAlreadyDeleted = await prismaClient.book.findFirst({
    where: {
      id: data.book_id,
    },
  });

  if (!checkBookAlreadyDeleted) {
    throw new ResponseError(
      404,
      "The book is already deleted or does not exist.",
    );
  }

  const isBookAlreadyBorrowedByStudent = await prismaClient.peminjaman.count({
    where: {
      book_id: data.book_id,
      student_id: data.student_id,
    },
  });

  if (isBookAlreadyBorrowedByStudent >= 1) {
    throw new ResponseError(
      400,
      "The book is already borrowed. Please return it first.",
    );
  }

  const stockBook = await prismaClient.book.findFirst({
    where: { id: data.book_id },
    select: { stok: true },
  });

  if (stockBook.stok <= 0) {
    throw new ResponseError(400, "Book is out of stock.");
  }

  const [loan, updateStock] = await prismaClient.$transaction([
    prismaClient.peminjaman.create({
      data: {
        borrow_at: new Date(),
        update_at: new Date(),
        student_id: data.student_id,
        book_id: data.book_id,
        notes: data.notes,
      },
    }),
    prismaClient.book.update({
      where: { id: data.book_id },
      data: {
        stok: {
          decrement: 1,
        },
      },
    }),
  ]);

  if (!updateStock) {
    throw new ResponseError(500, "Error occurred while updating book stock.");
  }
  return loan;
};

/**
 * Mengembalikan buku
 *
 * Fungsi untuk mengembalikan buku yang sudah dipinjam. Mengecek apakah buku yang dikembalikan benar-benar dipinjam oleh pengguna
 * dan memperbarui stok buku yang dikembalikan.
 *
 * @async
 * @function returnBook
 * @param {object} req - Request objek yang berisi data pengembalian buku
 * @param {object} res - Response objek yang akan mengirimkan hasil operasi ke client
 * @returns {Promise<object>} Pesan sukses pengembalian buku
 * @throws {ResponseError} 400 - Jika buku yang dikembalikan tidak pernah dipinjam
 */
const returnBook = async (req, res) => {
  const data = validate(returnValidation, req.body);

  const isBookBorrowedByStudent = await prismaClient.peminjaman.count({
    where: {
      book_id: data.book_id,
      student_id: data.student_id,
    },
  });

  if (isBookBorrowedByStudent < 1) {
    throw new ResponseError(400, "The user has not borrowed this book.");
  }

  const updateBook = await prismaClient.$transaction([
    prismaClient.book.update({
      where: { id: data.book_id },
      data: { stok: { increment: 1 } },
    }),
    prismaClient.peminjaman.update({
      where: {
        student_id_book_id: {
          student_id: data.student_id,
          book_id: data.book_id,
        },
      },
      data: {
        return_at: new Date(),
      },
    }),
  ]);

  return { message: "Book successfully returned and stock updated." };
};

export default {
  registrasi,
  login,
  getBookList,
  getBookById,
  loanBook,
  returnBook,
  findUserById,
};
