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
            name: "Ações", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Câmbio de moedas", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Clube de investimento", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Fundos de investimento", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Imóveis", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Investimento anjo", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Previdência Privada", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Títulos públicos", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Trader", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
        ]);
    });
}
