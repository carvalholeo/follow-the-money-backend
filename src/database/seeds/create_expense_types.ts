import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  return await knex("expense_types")
    .del()
    .then(async () => {
      const dateTime = new Date();
      // Inserts seed entries
      return await knex("expense_types")
        .insert([
          { 
            name: "Fixo", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Variável", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Fixo/Variável", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
        ]);
    });
}
