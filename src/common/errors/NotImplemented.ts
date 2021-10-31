import BaseError from "./base";
import HttpStatus from "http-status-codes";

class NotImplementedError extends BaseError {
  constructor(
    message = "The requested resource/method has not been implemented",
    isOperational = true,
    status = HttpStatus.NOT_IMPLEMENTED,
    data: any
  ) {
    super(message, isOperational, status, data);
    this.name = "NotImplementedError";
  }
}

export default NotImplementedError;
