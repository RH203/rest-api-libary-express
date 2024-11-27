import express from "express";
import publicController from "../controller/public-controller.js";

const publicApi = new express.Router();

// Registrasi
publicApi.post("/api/user/registrasi", publicController.registrasi);
// Login
// Melihat daftar buku
// Detail buku
// Melihat member lain yang aktif
// meminjam buku

export { publicApi };
