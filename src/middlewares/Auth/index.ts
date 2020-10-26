import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import options from "../../config/auth";
const { secret } = options;

export default (request: Request, response: Response, next: NextFunction) => {
  try {
    const authentication = String(request.headers.authentication);
    const session = String(request.headers.session);
    const parts = authentication.split(" ");
    const [scheme, token] = parts;

    if(!authentication) {
      throw {
        status: 401,
        message: "No token provided."
      }
    }

    if(parts.length !== 2) {
      throw {
        status: 401,
        message: "Failed to process request."
      }
    }

    if(!/Bearer/i.test(scheme)) {
      throw {
        status: 401,
        message: "Malformed token."
      }
    }

    jwt.verify(token, secret, (error: any, decoded: any) => {

      if(error) {
        throw {
          status: 400,
          message: "Invalid token."
        }
      }

      if(session !== decoded.authorization_id) {
        throw {
          status: 401,
          message: "Session key isn't valid to the token provided."
        }
      }

      next();
    });

  } catch (error) {
    response
      .status(error.status)
      .json({ error: error.message });

    return next(error.message)
  }
}
