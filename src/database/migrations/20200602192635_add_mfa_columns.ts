import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.table('users', table => {
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

export async function down(knex: Knex) {
  return knex.schema.table('users', function(table) {
    table.dropColumns('has_mfa', 'secret_mfa');
  });
};
