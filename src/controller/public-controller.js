import publicService from "../service/public-service.js";
import { logger } from "../app/logger.js";

// Registrasi controller
const registrasi = async (req, res, next) => {
  try {
    const result = await publicService.registrasi(req);

    res.status(200).json({
      status: 200,
      message: result,
    });
  } catch (e) {
    next(e);
  }
};

// Login controller
const login = async (req, res, next) => {
  try {
    const result = await publicService.login(req);
    res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

// Get Book controller
const getBookList = async (req, res, next) => {
  try {
    const result = await publicService.getBookList();

    res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

// Get book by id
const getBookById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(404).json({
        status: 404,
        message: "Not Found",
      });
      return;
    }

    const result = await publicService.getBookById(parseInt(id));

    res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const loanBook = async (req, res, next) => {
  try {
    logger.info(req.body);
    const result = await publicService.loanBook(req);
    res.status(200).json({
      status: 200,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default { registrasi, login, getBookList, getBookById, loanBook };
