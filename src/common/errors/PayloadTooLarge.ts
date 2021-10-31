import BaseError from "./base";
import HttpStatus from "http-status-codes";

class PayloadTooLargeError extends BaseError {
  constructor(
    message = "The request is larger than the server is willing or able to process",
    isOperational = true,
    status = HttpStatus.REQUEST_TOO_LONG,
    data: any
  ) {
    super(message, isOperational, status, data);
    this.name = "PayloadTooLargeError";
  }
}

export default PayloadTooLargeError;
