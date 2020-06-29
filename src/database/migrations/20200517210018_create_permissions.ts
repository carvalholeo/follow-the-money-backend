
import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("permissions", table => {
    table.increments("id")
      .primary();

    table.string("name")
      .notNullable();

    table.boolean("is_admin")
      .defaultTo(false);

    table.index("id");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("permissions");
}
