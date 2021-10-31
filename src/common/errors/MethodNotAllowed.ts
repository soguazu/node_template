import BaseError from "./base";
import HttpStatus from "http-status-codes";

class MethodNotAllowedError extends BaseError {
  constructor(message = "method not allowed", isOperational = true, status = HttpStatus.METHOD_NOT_ALLOWED, data: any) {
    super(message, isOperational, status, data);
    this.name = "MethodNotAllowedError";
  }
}

export default MethodNotAllowedError;
