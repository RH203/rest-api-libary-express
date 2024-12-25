import { PrismaClient } from "@prisma/client";
import { logger } from "./logger.js";

/**
 * Instance PrismaClient yang dikonfigurasi untuk logging.
 *
 * Konfigurasi logging:
 * - query: Log untuk semua query yang dijalankan.
 * - error: Log untuk semua error yang terjadi.
 * - info: Log untuk informasi tambahan.
 * - warn: Log untuk peringatan.
 *
 * Event handler:
 * - `error`: Log error menggunakan logger.
 * - `info`: Log informasi menggunakan logger.
 * - `warn`: Log peringatan menggunakan logger.
 *
 * @type {PrismaClient<
 *   {log: [
 *     {emit: string, level: string},
 *     {emit: string, level: string},
 *     {emit: string, level: string},
 *     {emit: string, level: string}
 *   ]},
 *   "log" extends keyof {
 *     log: [
 *       {emit: string, level: string},
 *       {emit: string, level: string},
 *       {emit: string, level: string},
 *       {emit: string, level: string}
 *     ]
 *   } ? (
 *     [
 *       {emit: string, level: string},
 *       {emit: string, level: string},
 *       {emit: string, level: string},
 *       {emit: string, level: string}
 *     ] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
 *       ? Prisma.GetEvents<
 *         [
 *           {emit: string, level: string},
 *           {emit: string, level: string},
 *           {emit: string, level: string},
 *           {emit: string, level: string}
 *         ]
 *       >
 *       : never
 *   ) : never,
 *   DefaultArgs
 * >}
 */
export const prismaClient = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
});

/**
 * Event handler untuk error.
 * Mencatat error menggunakan logger.
 *
 * @event
 * @param {Prisma.LogEvent} e - Objek event log dari Prisma.
 */
prismaClient.$on("error", e => {
  logger.error(e);
});

/**
 * Event handler untuk informasi.
 * Mencatat informasi menggunakan logger.
 *
 * @event
 * @param {Prisma.LogEvent} e - Objek event log dari Prisma.
 */
prismaClient.$on("info", e => {
  logger.info(e);
});

/**
 * Event handler untuk peringatan.
 * Mencatat peringatan menggunakan logger.
 *
 * @event
 * @param {Prisma.LogEvent} e - Objek event log dari Prisma.
 */
prismaClient.$on("warn", e => {
  logger.warn(e);
});
