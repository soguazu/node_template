import HttpStatus from "http-status-codes";

class BaseError extends Error {
  constructor(
    public message: string,
    public isOperational: boolean = false,
    public status = HttpStatus.INTERNAL_SERVER_ERROR,
    public data = {}
  ) {
    // Calling parent constructor of base Error class.
    super(message);

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    // Saving class getName in the property of our custom error as a shortcut.
    this.name = this.constructor.name;

    // You can use any additional properties you want.
    // I'm going to use preferred HTTP status for this error types.
    // `500` is the default value if not specified.
    this.status = status;
    this.isOperational = isOperational;
    // additional data
    this.data = data;
  }
}

export default BaseError;
