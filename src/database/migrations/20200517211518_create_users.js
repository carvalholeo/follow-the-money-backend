
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('email').notNullable();
    table.string('username', 50).notNullable();
    table.string('password').notNullable();
    table.boolean('is_active').notNullable();
    table.integer('permission_id').defaultTo(1);
    table.timestamps();

    table.foreign('permission_id').references('id').inTable('permissions');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
