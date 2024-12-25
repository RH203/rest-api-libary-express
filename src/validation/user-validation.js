import Joi from "joi";

/**
 * Validasi untuk registrasi pengguna baru.
 *
 * Validasi ini memastikan bahwa data yang diterima untuk proses registrasi pengguna baru sesuai dengan format yang benar.
 *
 * @constant {Object} registrationUserValidation
 * @property {string} name - Nama pengguna, wajib ada dan memiliki panjang maksimal 100 karakter
 * @property {string} email - Alamat email pengguna, wajib ada dan harus berupa email yang valid
 * @property {string} password - Kata sandi pengguna, wajib ada dan tidak dibatasi panjangnya
 * @property {string} gender - Jenis kelamin pengguna, wajib ada dan hanya boleh bernilai "Male" atau "Female"
 */
const registrationUserValidation = Joi.object({
  name: Joi.string().required().max(100),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  gender: Joi.string().valid("Male", "Female").required(),
});

/**
 * Validasi untuk login pengguna.
 *
 * Validasi ini memastikan bahwa data yang diterima untuk proses login pengguna sesuai dengan format yang benar.
 *
 * @constant {Object} loginUserValidation
 * @property {string} email - Alamat email pengguna, wajib ada dan harus berupa email yang valid
 * @property {string} password - Kata sandi pengguna, wajib ada dan tidak dibatasi panjangnya
 */
const loginUserValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export { registrationUserValidation, loginUserValidation };
