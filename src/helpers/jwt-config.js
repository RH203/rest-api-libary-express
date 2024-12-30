import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is not defined");
}

/**
 * Membuat JSON Web Token (JWT) untuk pengguna.
 *
 * Fungsi ini membuat token JWT berdasarkan nama pengguna, peran, dan waktu kedaluwarsa.
 * Token ini dapat digunakan untuk autentikasi dan otorisasi dalam aplikasi.
 *
 * @param {string} name - Nama pengguna yang akan disematkan dalam token.
 * @param {string} role - Peran pengguna yang akan disematkan dalam token (contoh: 'admin', 'user').
 * @param {string} [expiresIn="24h"] - Waktu kedaluwarsa token (default: "24h").
 *
 * @returns {string} Token JWT yang telah dibuat.
 */
const generateJWT = (id, name, role, expiresIn = "24h") => {
  return jwt.sign(
    {
      data: {
        id: id,
        name: name,
        role: role,
      },
    },
    SECRET_KEY,
    { expiresIn: expiresIn },
  );
};

/**
 * Memverifikasi dan mendekode token JWT.
 *
 * Fungsi ini memverifikasi keaslian token JWT dan mendekode payloadnya.
 * Jika token tidak valid atau telah kedaluwarsa, akan melemparkan error.
 *
 * @param {string} token - Token JWT yang ingin diverifikasi.
 *
 * @returns {object} Payload yang terdekode dari token jika valid.
 *
 * @throws {Error} Jika token tidak valid atau telah kedaluwarsa.
 */
const verifyJWT = token => {
  return jwt.verify(token, SECRET_KEY);
};
export { generateJWT, verifyJWT };
