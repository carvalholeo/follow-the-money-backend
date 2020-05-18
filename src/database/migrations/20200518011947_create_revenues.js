
exports.up = function(knex) {
    return knex.schema.createTable('revenues', function(table) {
        table.increments('id').primary();
        table.string('source', 50).notNullable();
        table.integer('revenue_category_id').notNullable();
        table.float('expected_amount').notNullable();
        table.float('paid_amount');
        table.date('expected_date').notNullable();
        table.date('effective_date');
        table.date('reference_month').notNullable().defaultTo(knex.fn.now());
        table.boolean('is_paid').notNullable().defaultTo(false);
        table.integer('user_id').notNullable();
        table.timestamps();
    
        table.foreign('revenue_category_id').references('id').inTable('revenue_categories');
        table.foreign('user_id').references('id').inTable('users');
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable('revenues');
};
