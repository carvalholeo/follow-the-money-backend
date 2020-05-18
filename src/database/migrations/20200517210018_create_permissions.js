
exports.up = function(knex) {
  return knex.schema.createTable('permissions', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.boolean('is_admin').defaultTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('permissions');
};
