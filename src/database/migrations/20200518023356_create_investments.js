
exports.up = function(knex) {
  return knex.schema.createTable('investments', function(table) {
    table.increments('id').primary();
    table.string('description', 50).notNullable();
    table.integer('investment_type_id').notNullable();
    table.integer('investment_category_id').notNullable();
    table.string('broker', 100).notNullable();
    table.string('source').defaultTo('Salário');
    table.datetime('investment_date').notNullable();
    table.float('quantity').notNullable().defaultTo(1);
    table.float('unitary_value').notNullable();
    table.float('amount_invested').notNullable();
    table.float('amount_taxfree');
    table.float('amount_withtax');
    table.float('amount_redeemed');
    table.date('reference_month').notNullable().defaultTo(knex.fn.now());
    table.date('expected_date');
    table.integer('user_id').notNullable();

    table.foreign('investment_type_id').references('id').inTable('investment_types');
    table.foreign('investment_category_id').references('id').inTable('investment_categories');
    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('investments')
};
