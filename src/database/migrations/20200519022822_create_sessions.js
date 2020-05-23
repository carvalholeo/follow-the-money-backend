
exports.up = function(knex) {
  return knex.schema.createTable('sessions', function(table) {
    table.string('authorization_id', 34)
      .unique()
      .notNullable()
      .primary();
    table.integer('user_id')
      .notNullable()
      .primary();
    table.string('ip_address', 100)
      .defaultTo(' ');
    table.string('user_agent')
      .defaultTo('Unknown');
    table.timestamp('logon_at', { precision: 6 })
      .defaultTo(knex.fn.now());

    table.foreign('user_id').references('id').inTable('id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('sessions');
};
