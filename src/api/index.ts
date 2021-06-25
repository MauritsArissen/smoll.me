import { Router } from "express";
import shortener from "./routes/shortener";
import url from "./routes/url";

export default () => {
  const app = Router();
  shortener(app);
  url(app);
  return app;
};
