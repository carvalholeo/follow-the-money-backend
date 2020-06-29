import connection from "../../database/connection";

export default async function getSecret(user_id: number) {
  try {
    const [{secret_mfa}] = await connection("users")
      .where("id", "=", user_id)
      .select("secret_mfa");
 
    return String(secret_mfa);
  } catch (error) {
    throw error;
  }
}