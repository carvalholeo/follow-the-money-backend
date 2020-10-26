import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

/**
 * @description Validate if Express Validators returned some error. If yes, breaks up the request chain. Else, delivery the request to the next middleware or to the controller.
 * @param request Request object, automatically provided by Express Framework
 * @param response Response object, automatically provided by Express Framework
 * @param next Callback function called when middleware finishes its processing.
 * @returns This functions doesn't have an explicit return.
 */
function ErrorValidation(request: Request, response: Response, next: NextFunction): void {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return next();
  }

  return next(errors.array());
}

export default ErrorValidation;
