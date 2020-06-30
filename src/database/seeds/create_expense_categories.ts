import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  return await knex("expense_categories")
    .del()
    .then(async () => {
      const dateTime = new Date();
      // Inserts seed entries
      return await knex("expense_categories")
        .insert([
          { 
            name: "Cartão de Crédito", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Comunicação",
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Despesas de saúde", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Educação", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Eletrônicos", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Empréstimo", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Entretenimento", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Farmácia", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Governo/Impostos", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Investimentos", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Materiais de construção", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Parentes", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Refeição/Lanchonete", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Saque em espécie", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Supermercado", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Tarifas bancárias", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Transporte", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
          { 
            name: "Variedades", 
            created_at: dateTime, 
            updated_at: dateTime 
          },
        ]);
    });
}
