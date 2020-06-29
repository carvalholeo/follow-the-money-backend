import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("users", table => {
    table.increments("id")
      .primary();

    table.string("email")
      .notNullable()
      .unique();

    table.string("username", 50)
      .notNullable()
      .unique();

    table.string("password")
      .notNullable();

    table.boolean("is_active")
      .notNullable();

    table.integer("permission_id")
      .unsigned()
      .defaultTo(1);

    table.timestamps();

    table.foreign("permission_id", "fk_permission_id_users")
      .references("id")
      .inTable("permissions")
      .onDelete("NO ACTION")
      .onUpdate("NO ACTION");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("users");
}
