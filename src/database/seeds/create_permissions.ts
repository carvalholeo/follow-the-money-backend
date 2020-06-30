import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  return await knex("permissions")
    .insert([
      { 
        name: "User", 
        is_admin: false
      },
      { 
        name: "Administrator", 
        is_admin: true
      },
      { 
        name: "Support", 
        is_admin: true
      },
      { 
        name: "Data Analyst", 
        is_admin: true
      },
    ]);

}
