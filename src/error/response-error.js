/**
 * Kelas untuk menangani error dengan status HTTP yang dapat disesuaikan.
 *
 * Kelas ini mewarisi dari built-in `Error` dan menambahkan properti `status`
 * yang memungkinkan penyimpanan status HTTP khusus bersama dengan pesan error.
 *
 * Contoh penggunaan:
 * ```js
 * throw new ResponseError(404, "Resource not found");
 * ```
 *
 * @extends {Error}
 */
class ResponseError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export { ResponseError };
