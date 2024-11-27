import express from "express";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { publicApi } from "../router/public-api.js";

export const web = express();
web.use(express.json());

web.use(publicApi);

web.use(errorMiddleware);
