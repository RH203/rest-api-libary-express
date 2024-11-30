import express from "express";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { publicApi } from "../router/public-api.js";
import rateLimit from "express-rate-limit";

export const web = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

web.use(express.json());
web.use(limiter);

web.use(publicApi);

web.use(errorMiddleware);
