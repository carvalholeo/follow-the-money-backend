import connection from "../database/connection";
import Logger from "./Logger";

const logger = new Logger();

export default async function getUserId(session_token: string): Promise<number> {
  try {
    const [{ id }] = await connection("sessions")
      .where({ 
        "sessions.authorization_id": session_token
      })
      .join("users", "users.id", "=", "sessions.user_id")
      .select("users.id");
            
    return Number(id);

  } catch (error) {

    logger.makeLog("GetUserIdUtils", error);
    
    throw error;
  }
    
}