import BaseError from "./base";
import HttpStatus from "http-status-codes";

class ResourceNotFoundError extends BaseError {
  constructor(
    message = "You have attempted to access an API endpoint that does not exist.",
    isOperational = true,
    status = HttpStatus.NOT_FOUND,
    data: any
  ) {
    super(message, isOperational, status, data);
    this.name = "ResourceNotFoundError";
  }
}
export default ResourceNotFoundError;
