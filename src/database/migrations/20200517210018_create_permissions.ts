
import Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("permissions", table => {
    table.increments("id")
      .primary();

    table.string("name")
      .notNullable();

    table.boolean("is_admin")
      .defaultTo(false);

    table.index("id");
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("permissions");
}
