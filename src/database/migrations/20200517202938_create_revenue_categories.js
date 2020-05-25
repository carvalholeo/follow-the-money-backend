
exports.up = function(knex) {
  return knex.schema.createTable('revenue_categories', function(table) {
    table.increments('id')
      .primary();

    table.string('name', 100)
      .notNullable();
      
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('revenue_categories');
};
