
exports.up = function(knex) {
  return knex.schema.table('users', function(table) {
    table.boolean('has_mfa')
        .nullable()
        .defaultTo(false)
        .after('permission_id');

    table.string('secret_mfa')
        .nullable()
        .defaultTo(null)
        .after('has_mfa');
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', function(table) {
    table.dropColumns('has_mfa', 'secret_mfa');
  });
};
