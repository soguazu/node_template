import BaseError from "./base";
import HttpStatus from "http-status-codes";

class PaymentRequiredError extends BaseError {
  constructor(
    message = "Payment is required", 
    isOperational = true, 
    status = HttpStatus.PAYMENT_REQUIRED, 
    data: any
    ) {
    super(message, isOperational, status, data);
    this.name = "PaymentRequiredError";
  }
}

export default PaymentRequiredError;
