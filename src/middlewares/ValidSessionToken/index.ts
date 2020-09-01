import { Request, Response, NextFunction } from "express";

import connection from "../../database/connection";
import Logger from "../../utils/Logger";

const logger = new Logger();

export default async (request: Request, response: Response, next: NextFunction) => {
  try {
    const token = String(request.headers.session);
    
    const [is_valid] = await connection("sessions")
      .where("authorization_id", token)
      .select("*");
    
    if(!is_valid) {
      return response
        .status(401)
        .json({ message: "Authorization token isn't valid. Login in the system and try again." });
    }

    next();

  } catch (error) {

    logger.makeLog("ValidateSessionMiddleware", error);

    return response
      .status(500)
      .json({ error: "There was an error on server. Try again later." });
  }
}
