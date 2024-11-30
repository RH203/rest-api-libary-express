import { ResponseError } from "../error/response-error.js";

const errorMiddleware = (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseError) {
    res
      .status(err.status)
      .json({
        status: err.status,
        errors: err.message,
      })
      .end();
  } else {
    res
      .status(500)
      .json({
        status: 500,
        errors: err.message,
      })
      .end();
  }
};

export { errorMiddleware };
