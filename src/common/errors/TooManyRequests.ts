import BaseError from "./base";
import HttpStatus from "http-status-codes";

class TooManyRequestsError extends BaseError {
  constructor(
    message = "Too many requests sent in a given amount of time",
    isOperational = true,
    status = HttpStatus.TOO_MANY_REQUESTS,
    data: any
  ) {
    super(message, isOperational, status, data);
    this.name = "TooManyRequestsError";
  }
}

export default TooManyRequestsError;
