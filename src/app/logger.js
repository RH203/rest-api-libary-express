import winston from "winston";

/**
 * Logger instance yang dikonfigurasi menggunakan Winston.
 *
 * Konfigurasi:
 * - Level log: `info`
 * - Format: JSON dengan indentasi 1 spasi
 * - Transport: Output ke konsol
 *
 * Penggunaan:
 * - Gunakan metode seperti `logger.info`, `logger.error`, atau `logger.warn` untuk mencatat log dengan level yang sesuai.
 *
 * @type {winston.Logger}
 * @property {string} level - Level logging default untuk logger ini (default: "info").
 * @property {winston.Logform.Format} format - Format logging yang digunakan (default: JSON dengan indentasi 1 spasi).
 * @property {winston.transport[]} transports - Transportasi logging yang digunakan (default: Console transport).
 * @see {@link https://github.com/winstonjs/winston} Dokumentasi resmi Winston
 */
export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json({
    space: 1,
  }),
  transports: [new winston.transports.Console({})],
});
