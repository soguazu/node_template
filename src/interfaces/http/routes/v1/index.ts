import { Router } from "express";
import fs from "fs";
import path from "path";

const _require = require;

const router = Router();

// Automatically loads all your routes and export them
fs.readdirSync(__dirname)
  .filter((file) => file !== path.basename(__filename) && path.extname(file) === ".ts")
  .forEach((file) => {
    const endpoint = `/${file.split(".ts")[0]}`;
    const route = _require(path.join(__dirname, file)).default;
    router.use(endpoint, route);
  });

export default router;