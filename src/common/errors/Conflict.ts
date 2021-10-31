import BaseError from "./base";
import HttpStatus from "http-status-codes";

class ConflictError extends BaseError {
  constructor(
    message = "Resource already exists",
    isOperational = false,
    status = HttpStatus.CONFLICT,
    data: any
  ) {
    super(message, isOperational, status, data);
    this.name = "ConflictError";
  }
}

export default ConflictError;
