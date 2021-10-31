import BaseError from "./base";
import HttpStatus from "http-status-codes";

class UnprocessableEntityError extends BaseError {
  constructor(
    message = "The request was well-formed but was unable to be followed due to semantic errors",
    isOperational = true,
    status = HttpStatus.UNPROCESSABLE_ENTITY,
    data: any
  ) {
    super(message, isOperational, status, data);
    this.name = "UnprocessableEntityError";
  }
}

export default UnprocessableEntityError;
