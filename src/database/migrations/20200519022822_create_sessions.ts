import Knex from 'knex';

export function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('sessions', table => {
    table.string('authorization_id', 34)
      .notNullable();

    table.integer('user_id')
      .unsigned()
      .notNullable();

    table.string('ip_address', 100)
      .defaultTo(' ');

    table.string('user_agent')
      .defaultTo('Unknown');

    table.timestamp('logon_at', { precision: 6 })
      .defaultTo(knex.fn.now());

    table.primary(['authorization_id', 'user_id'], 'pk_sessions');

    table.foreign('user_id', 'fk_user_id_sessions')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('NO ACTION');
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('sessions');
}
