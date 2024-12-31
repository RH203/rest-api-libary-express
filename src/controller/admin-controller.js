import adminService from "../service/admin-service.js";
import { logger } from "../app/logger.js";
import {prismaClient} from "../app/database.js";

/**
 * Menambahkan buku baru melalui layanan admin.
 *
 * Fungsi ini menerima request untuk menambahkan buku baru, kemudian
 * memanggil layanan `adminService.addNewBook()` untuk memproses data
 * buku yang dikirim melalui request. Setelah itu, mengirimkan respons
 * dengan status 200 dan data buku yang berhasil ditambahkan.
 *
 * Jika terjadi error, error tersebut diteruskan ke middleware error handler.
 *
 * @param {express.Request} req - Request objek yang berisi data buku yang akan ditambahkan.
 * @param {express.Response} res - Response objek untuk mengirimkan hasil operasi ke client.
 * @param {express.NextFunction} next - Fungsi middleware untuk meneruskan error ke handler berikutnya.
 *
 * @returns {void} Mengirimkan respons JSON dengan status 200 jika berhasil, atau error jika gagal.
 */
const addNewBook = async (req, res, next) => {
  try {
    const result = await adminService.addNewBook(req);

    res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const removeBook = async (req, res, next) => {
  try {
    const result = await adminService.removeBook(req);

    res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const result = await adminService.updateBook(req);

    logger.info(result);

    if (!result) {
      res.status(404).json({
        status: 404,
        message: "Not Found",
      });
    }
    res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const result = await adminService.updateUser(req.body);

    res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const result = await adminService.getAllUser();

    res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (error) {
    next(error.status);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).json({
        status: 404,
        message: "Not Found",
      });
      return;
    }

    const result = await adminService.deleteUser(id);

    res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const addNewPublisher = async (req, res, next) => {
  try {
const result = await adminService.addNewPublisher(req.body)

    res.status(200).json({
      status: 200,
      data: result,
    })
  } catch (error) {
    next(error);
  }

}

const addNewGenre = async (req, res, next) => {
  try {
    const result = await adminService.addNewGenre(req.body)

    res.status(200).json({
      status: 200,
      data: result,
    })
  } catch (error) {
    next(error);
  }

}

const getAllGenre = async (req, res, next) => {
  try {
const result = await adminService.getAllGenre()

    res.status(200).json({
      status: 200,
      data: result,
    })
  } catch (error) {
    next(error);
  }
}

const getAllPublisher = async (req, res, next) => {
  try {
    const result = await adminService.getAllPublisher()

    res.status(200).json({
      status: 200,
      data: result,
    })
  } catch (error) {
    next(error);
  }
}

export default {
  addNewBook,
  removeBook,
  updateBook,
  updateUser,
  getAllUser,
  deleteUser,
  addNewPublisher,
  addNewGenre,
  getAllPublisher,
  getAllGenre
};
