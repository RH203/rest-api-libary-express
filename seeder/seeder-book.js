// seeder genre
import { prismaClient } from '../src/app/database.js';
import { logger } from '../src/app/logger.js';
import { faker } from '@faker-js/faker/locale/id_ID';
import { clearDatabase } from './utils-seeder.js';

const seederGenre = async () => {
  try {
    await clearDatabase();
    for (let i = 0; i < 15; i++) {
      await prismaClient.genre.create({
        data: {
          name: faker.book.genre(),
        },
      });
    }
    logger.info('Genres seeded successfully!');
  } catch (error) {
    logger.error('Error seeding genres:', error);
  }
};

const seederPublisher = async () => {
  try {
    await clearDatabase();
    for (let i = 0; i < 15; i++) {
      await prismaClient.publisher.create({
        data: {
          name: faker.book.publisher(),
        },
      });
    }
    logger.info('Genres seeded successfully!');
  } catch (error) {
    logger.error('Error seeding publisher:', error);
  }
};

const seederBook = async () => {
  try {
    for (let i = 0; i < 15; i++) {
      const publisherId = faker.number.int({ min: 1, max: 15 });
      await prismaClient.book.create({
        data: {
          title: faker.book.title(),
          author: faker.book.author(),
          isbn: faker.string.uuid(),
          publisherBookId: publisherId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }
    logger.info('Books seeded successfully!');
  } catch (error) {
    logger.error('Error seeding books:', error);
  }
};

// Seeder genre-book
const seederGenreBook = async () => {
  try {
    const books = await prismaClient.book.findMany();

    for (const book of books) {
      const genreIds = new Set();

      // Mendapatkan dua genre acak yang berbeda
      while (genreIds.size < 2) {
        const randomGenreId = Math.floor(Math.random() * 15) + 1;
        genreIds.add(randomGenreId);
      }

      // Menambahkan relasi genre ke buku
      for (const genreId of genreIds) {
        await prismaClient.genreBook.create({
          data: {
            bookId: book.id,
            genreId: genreId,
          },
        });
      }
    }

    logger.info('Genres successfully linked to books!');
  } catch (error) {
    logger.error('Error linking genres to books:', error);
  }
};

export { seederGenre, seederPublisher, seederBook, seederGenreBook };
