import BaseError from "./base";
import HttpStatus from "http-status-codes";

class RequestTimeoutError extends BaseError {
  constructor(
    message = "The server timed out waiting for the request",
    isOperational = true,
    status = HttpStatus.REQUEST_TIMEOUT,
    data: any
  ) {
    super(message, isOperational, status, data);
    this.name = "RequestTimeoutError";
  }
}

export default RequestTimeoutError;
