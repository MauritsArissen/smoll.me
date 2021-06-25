import { Router } from "express";
import shorten from "./routes/shorten";
import url from "./routes/url";

export default () => {
  const app = Router();
  shorten(app);
  url(app);
  return app;
};
