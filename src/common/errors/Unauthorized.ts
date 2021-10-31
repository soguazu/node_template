import BaseError from "./base";
import HttpStatus from "http-status-codes";

class UnauthorizedError extends BaseError {
  constructor(
    message = "Authorization is required to access this API endpoint.",
    isOperational = true,
    status = HttpStatus.UNAUTHORIZED,
    data: any
  ) {
    super(message, isOperational, status, data);
    this.name = "UnauthorizedError";
  }
}

export default UnauthorizedError;
