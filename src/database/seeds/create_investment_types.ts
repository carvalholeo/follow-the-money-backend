import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  return await knex("investment_types")
    .del()
    .then(async () => {
      const dateTime = new Date();
      // Inserts seed entries
      return await knex("investment_types")
        .insert([
          { 
            name: "Renda Fixa", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Renda Fixa/Variável", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Renda Variável", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
        ]);
    });
}
