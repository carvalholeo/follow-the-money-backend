import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  return await knex("revenue_categories")
    .del()
    .then(async () => {
      const dateTime = new Date();
      // Inserts seed entries
      return await knex("revenue_categories")
        .insert([
          { 
            name: "Benefícios governamentais", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Bônus", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Desenvolvimento de sites", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Desenvolvimento de softwares", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Implatação de sistemas", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Remuneração mensal", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Resgate de investimentos", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Restituição de débitos", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Restituição de impostos", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Serviços de suporte informático", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Vale transporte", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Verbas trabalhistas", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
        ]);
    });
}