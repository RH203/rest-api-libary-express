import publicService from "../service/public-service.js";
import { logger } from "../app/logger.js";

const registrasi = async (req, res, next) => {
  try {
    logger.info(req.body);
    const result = await publicService.registrasi(req);

    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export default { registrasi };
