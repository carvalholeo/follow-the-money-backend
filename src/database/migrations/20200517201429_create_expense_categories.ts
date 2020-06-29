import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("expense_categories", table => {
    table.increments("id")
      .primary();

    table.string("name", 100)
      .notNullable();
      
    table.timestamps();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("expense_categories");
}
