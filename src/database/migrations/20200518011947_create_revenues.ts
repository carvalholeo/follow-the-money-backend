import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("revenues", table => {
    table.increments("id")
      .primary();

    table.string("source", 50)
      .notNullable();

    table.integer("revenue_category_id")
      .unsigned()
      .notNullable();

    table.float("expected_amount")
      .notNullable();

    table.float("paid_amount");
    table.date("expected_date")
      .notNullable();

    table.date("effective_date");
    table.date("reference_month")
      .notNullable()
      .defaultTo(knex.fn.now());

    table.boolean("is_paid")
      .notNullable()
      .defaultTo(false);

    table.integer("user_id")
      .unsigned()
      .notNullable();

    table.timestamps();

    
    table.foreign("revenue_category_id", "fk_revenue_category")
      .references("id")
      .inTable("revenue_categories")
      .onDelete("RESTRICT")
      .onUpdate("NO ACTION");

    table.foreign("user_id", "fk_user_id_revenue")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("NO ACTION");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("revenues");
}
