import { ResponseError } from "../error/response-error.js";

/**
 * Fungsi untuk memvalidasi request menggunakan schema Joi.
 *
 * Fungsi ini akan menerima schema validasi dan data request, kemudian memvalidasi data request terhadap schema tersebut.
 * Jika data tidak valid, fungsi ini akan melemparkan error dengan status 400 dan pesan error yang diberikan oleh Joi.
 * Jika data valid, fungsi ini akan mengembalikan nilai yang sudah divalidasi.
 *
 * @function validate
 * @param {Object} schema - Schema Joi yang digunakan untuk memvalidasi data request.
 * @param {Object} request - Data request yang akan divalidasi.
 * @throws {ResponseError} Jika data tidak valid, melemparkan error dengan status 400 dan pesan error dari Joi.
 * @returns {Object} Data yang sudah divalidasi sesuai dengan schema yang diberikan.
 */
const validate = (schema, request) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
  });
  if (result.error) {
    throw new ResponseError(400, result.error.message);
  } else {
    return result.value;
  }
};

export { validate };
