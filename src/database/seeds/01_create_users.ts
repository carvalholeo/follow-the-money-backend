import * as Knex from "knex";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export async function seed(knex: Knex): Promise<void> {
  const salt = Number(process.env.BCRYPT_ROUNDS);
  const env = process.env.NODE_ENV;
  const dateTime = new Date();

  const password = await bcrypt.hash("password", salt);

  if (env === "production") {
    return process.exit();
  }

  // Inserts seed entries
  return await knex("users")
    .insert([
      { 
        email: "admin@admin",
        username: "admin",
        password: password,
        is_active: true,
        permission_id: 7,
        process_approver_id: null,
        has_mfa: false,
        secret_mfa: null,
        created_at: dateTime, 
        updated_at: dateTime 
      },
      { 
        email: "root@root",
        username: "root",
        password: password,
        is_active: true,
        permission_id: 7,
        process_approver_id: 1,
        has_mfa: false,
        secret_mfa: null,
        created_at: dateTime, 
        updated_at: dateTime 
      },
      { 
        email: "customer@customer",
        username: "customer",
        password: password,
        is_active: true,
        permission_id: 1,
        process_approver_id: null,
        has_mfa: false,
        secret_mfa: null,
        created_at: dateTime, 
        updated_at: dateTime 
      },
      { 
        email: "support@support",
        username: "support",
        password: password,
        is_active: true,
        permission_id: 2,
        process_approver_id: null,
        has_mfa: false,
        secret_mfa: null,
        created_at: dateTime, 
        updated_at: dateTime 
      },
      { 
        email: "analyst@analyst",
        username: "analyst",
        password: password,
        is_active: true,
        permission_id: 3,
        process_approver_id: null,
        has_mfa: false,
        secret_mfa: null,
        created_at: dateTime, 
        updated_at: dateTime 
      },
      { 
        email: "dev@dev",
        username: "dev",
        password: password,
        is_active: true,
        permission_id: 4,
        process_approver_id: null,
        has_mfa: false,
        secret_mfa: null,
        created_at: dateTime, 
        updated_at: dateTime 
      },
      { 
        email: "hr@hr",
        username: "hr",
        password: password,
        is_active: true,
        permission_id: 5,
        process_approver_id: 2,
        has_mfa: false,
        secret_mfa: null,
        created_at: dateTime, 
        updated_at: dateTime 
      },
      { 
        email: "legal@legal",
        username: "legal",
        password: password,
        is_active: true,
        permission_id: 6,
        process_approver_id: 2,
        has_mfa: false,
        secret_mfa: null,
        created_at: dateTime, 
        updated_at: dateTime 
      },
    ]);
}
