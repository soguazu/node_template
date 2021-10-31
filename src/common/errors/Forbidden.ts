import BaseError from "./base";
import HttpStatus from "http-status-codes";

class ForbiddenError extends BaseError {
  constructor(
    message = "You do not have permission to access this API endpoint.",
    isOperational = true,
    status = HttpStatus.FORBIDDEN,
    data: any
  ) {
    super(message, isOperational, status, data);
    this.name = "ForbiddenError";
  }
}

export default ForbiddenError;
