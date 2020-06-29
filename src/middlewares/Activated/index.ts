import { Request, Response, NextFunction } from "express";

import connection from "../../database/connection";
import getUserId from "../../utils/getUserId";
import Logger from "../../utils/Logger";

const logger = new Logger();

export default async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = await getUserId(String(request.headers.session));
    
    const [activated] = await connection("users")
      .where("id", id)
      .select("is_active");
    
    if(!activated.is_active) {
      return response.status(403)
        .json({ message: "Your user is blocked. If you think that it's an error, contact system administrator to support." });
    }

    next();

  } catch (error) {

    logger.makeLog("ActivatedMiddleware", error);
    return response.status(500)
      .json({ error: "There was an error on server. Try again later." });
  }
}