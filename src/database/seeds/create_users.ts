import * as Knex from "knex";
import bcrypt from "bcryptjs";

export async function seed(knex: Knex): Promise<void> {
  const dateTime = new Date();

  const salt = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync("password", salt);

  // Inserts seed entries
  return await knex("users")
    .insert([
      { 
        email: "user@user",
        username: "user",
        password: password,
        is_active: true,
        permission_id: 1,
        has_mfa: false,
        secret_mfa: null,
        created_at: dateTime, 
        updated_at: dateTime 
      },
      { 
        email: "admin@admin",
        username: "admin",
        password: password,
        is_active: true,
        permission_id: 2,
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
        permission_id: 3,
        has_mfa: false,
        secret_mfa: null,
        created_at: dateTime, 
        updated_at: dateTime 
      },
      { 
        email: "data@data",
        username: "data",
        password: password,
        is_active: true,
        permission_id: 4,
        has_mfa: false,
        secret_mfa: null,
        created_at: dateTime, 
        updated_at: dateTime 
      },
    ]);

}
