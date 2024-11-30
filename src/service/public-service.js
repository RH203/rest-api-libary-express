import {ResponseError} from "../error/response-error.js";
import {prismaClient} from "../app/database.js";
import bcrypt from "bcrypt";
import {Role} from "@prisma/client";
import {validate} from "../validation/validation.js";
import {loginUserValidation, registrationUserValidation,} from "../validation/user-validation.js";
import {generateJWT} from "../helpers/jwt-config.js";

// Registrasi
const registrasi = async (req, res) => {
  const data = validate(registrationUserValidation, req.body);

  const checkAccountDuplicate = await prismaClient.student.findUnique({
    where: { email: data.email },
  });

  if (checkAccountDuplicate) {
    throw new ResponseError(400, "email already exists!");
  }

  data.password = await bcrypt.hash(data.password, 10);

  const result = await prismaClient.student.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      role: Role.Student,
      gender: data.gender,
    },
  });

  return prismaClient.student.findFirst({
    where: { id: result.id },
  });
};

// login
const login = async (req, res) => {
  const data = validate(loginUserValidation, req.body);

  const account = await prismaClient.student.findFirst({
    where: { email: data.email },
    select: { name: true, email: true, password: true, role: true },
  });

  if (!account) {
    throw new ResponseError(400, "Email or password is wrong!");
  }

  const isPasswordSame = await bcrypt.compare(data.password, account.password);

  if (!isPasswordSame) {
    throw new ResponseError(400, "Email or password is wrong!");
  }

  return generateJWT(account.name, account.role);
};

// Melihat daftar buku
const getBookList = async (req, res) => {
  const data = await prismaClient.book.findMany({
    select: {
      id: true,
      title: true,
      author: true,
      description: true,
      isbn: true,
      genres: {
        select: {
          genre: {
            select: {
              name: true
            }
          }
        }
      },
      publisher: {
        select: {
          name: true
        }
      }
    }
  })

  return data.map(book => ({
    id: book.id,
    title: book.title,
    author: book.author,
    description: book.description,
    isbn: book.isbn,
    genres: book.genres.map((genre) => genre.genre.name),
    publisher: book.publisher?.name || "Unknown",
  }))
}

// Detail buku
const getBookById = async (id) => {

  const data = await prismaClient.book.findFirst({
    where: { id: id },
    select: {
      id: true,
      title: true,
      author: true,
      description: true,
      isbn: true,
      genres: {
        select: {
          genre: {
            select: {
              name: true
            }
          }
        }
      },
      publisher: {
        select: {
          name: true
        }
      }
    }
  })

  if (!data) {
    throw new ResponseError(400, "No book found with id " + req.params.id);
  }

  return {
    id: data.id,
    title: data.title,
    author: data.author,
    description: data.description,
    isbn: data.isbn,
    genres: data.genres.map((genre) => genre.genre.name),
    publisher: data.publisher?.name || "Unknown",
  }
}

// Melihat member lain yang aktif
// meminjam buku

export default { registrasi, login, getBookList, getBookById};
