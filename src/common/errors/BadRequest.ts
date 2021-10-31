import BaseError from "./base";
import HttpStatus from "http-status-codes";

class BadRequestError extends BaseError {
  constructor(
    message = "The request was not properly formatted",
    isOperational = true,
    status = HttpStatus.BAD_REQUEST,
    data: any
  ) {
    super(message, isOperational, status, data);
    this.name = "BadRequestError";
  }
}

export default BadRequestError;
