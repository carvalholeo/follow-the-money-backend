
exports.up = function(knex) {
  return knex.schema.createTable('expenses', function(table) {
    table.increments('id').primary();
    table.string('source', 50).notNullable();
    table.integer('expense_type_id').notNullable();
    table.integer('expense_category_id').notNullable();
    table.float('expected_amount').notNullable();
    table.float('paid_amount');
    table.date('due_date').notNullable();
    table.date('payday');
    table.date('reference_month').notNullable().defaultTo(knex.fn.now());
    table.boolean('is_paid').notNullable().defaultTo(false);
    table.integer('user_id').notNullable();
    table.timestamps();

    table.foreign('expense_type_id').references('id').inTable('expense_types');
    table.foreign('expense_category_id').references('id').inTable('expense_categories');
    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('expenses');
};
