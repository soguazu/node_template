import BaseError from "./base";
import HttpStatus from "http-status-codes";

class InvalidPayloadError extends BaseError {
  constructor(message = "Provided payload is invalid", isOperational = true,  status = HttpStatus.BAD_REQUEST, data: any) {
    super(message, isOperational, status, data);
    this.name = "InvalidPayloadError";
  }
}

export default InvalidPayloadError;
