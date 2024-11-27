import { logger } from "../src/app/logger.js";
import { prismaClient } from "../src/app/database.js";

const clearDatabase = async () => {
  try {
    // Hapus semua data di tabel genre
    await prismaClient.genre.deleteMany();
    // Hapus data tabel lainnya jika diperlukan
    await prismaClient.publisher.deleteMany();

    logger.info("All data cleared successfully!");
  } catch (error) {
    logger.error("Error clearing data:", error);
  }
};

export { clearDatabase };
