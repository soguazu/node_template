import { NextFunction } from "express";
import ResourceNotFoundError from "@common/errors/ResourceNotFound";
import httpStatusCodes from "@src/interfaces/http/common/httpStatusCode";

/**
* Handle 404 errors
* @param {Object} req - Incoming request
* @param {Object} res - Server response
*/
export default async (req: Request, res: Response, next: NextFunction) => {
  next(
    new ResourceNotFoundError(
      `You have tried to access an API endpoint (${
        req.url
      }) with a '${req.method}' method that does not exist.`,
      true,
      httpStatusCodes.NOT_FOUND,
      {}
    ),
  );
};