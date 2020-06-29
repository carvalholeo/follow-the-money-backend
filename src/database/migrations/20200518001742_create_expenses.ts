import Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable("expenses", table => {
    table.increments("id")
      .primary();

    table.string("source", 50)
      .notNullable();

    table.integer("expense_type_id")
      .unsigned()
      .notNullable();

    table.integer("expense_category_id")
      .unsigned()
      .notNullable();

    table.float("expected_amount")
      .notNullable();

    table.float("paid_amount");
    table.date("due_date")
      .notNullable();

    table.date("payday");
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


    table.foreign("expense_type_id", "fk_expense_type_id")
      .references("id")
      .inTable("expense_types")
      .onDelete("RESTRICT")
      .onUpdate("NO ACTION");
    
    table.foreign("expense_category_id", "fk_expense_category_id")
      .references("id")
      .inTable("expense_categories")
      .onDelete("RESTRICT")
      .onUpdate("NO ACTION");

    table.foreign("user_id", "fk_user_id_expenses")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("NO ACTION");
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable("expenses");
}
