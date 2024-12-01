import express from "express";
import publicController from "../controller/public-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { rolesMiddleware } from "../middleware/roles-middleware.js";

const publicApi = new express.Router();

// Registrasi
publicApi.post("/api/user/registrasi", publicController.registrasi);
// Login
publicApi.get("/api/user/login", publicController.login);
// Melihat daftar buku
publicApi.get(
  "/api/book",
  [authMiddleware, rolesMiddleware],
  publicController.getBookList,
);
// Detail buku
publicApi.get("/api/book/:id", authMiddleware, publicController.getBookById);
// Melihat member lain yang aktif

// meminjam buku
publicApi.post("/api/book/borrow", authMiddleware, publicController.loanBook);
// Mengembalikan buku
publicApi.post("/api/book/return", authMiddleware, publicController.returnBook);

export { publicApi };
