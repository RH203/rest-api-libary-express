// Registrasi
import { ResponseError } from "../error/response-error.js";
import { prismaClient } from "../app/database.js";
import bcrypt from "bcrypt";
import { Role } from "@prisma/client";
import { validate } from "../validation/validation.js";
import { registrationUserValidation } from "../validation/user-validation.js";
import { logger } from "../app/logger.js";

const registrasi = async (req, res) => {
  const data = validate(registrationUserValidation, req.body);

  if (data.error) {
    throw new ResponseError(400, data.error);
  }

  const checkAccountDuplicate = await prismaClient.student.count({
    where: { email: data.email },
  });

  if (checkAccountDuplicate >= 1) {
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

// Login
const login = async (req, res) => {};
// Melihat daftar buku
// Detail buku
// Melihat member lain yang aktif
// meminjam buku

export default { registrasi };
