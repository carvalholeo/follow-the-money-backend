
exports.up = function(knex) {
  return knex.schema.createTable('expense_types', function(table) {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('expense_types');
};
