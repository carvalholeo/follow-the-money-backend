import Knex from 'knex';

export function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', table => {
    table.increments('id')
      .primary();

    table.string('email')
      .notNullable()
      .unique();

    table.string('username', 50)
      .notNullable()
      .unique();

    table.string('password')
      .notNullable();

    table.boolean('is_active')
      .notNullable();

    table.integer('permission_id')
      .unsigned()
      .defaultTo(1);

    table.integer('process_approver_id')
      .unsigned()
      .nullable()
      .defaultTo(null);

    table.boolean('has_mfa')
      .nullable()
      .defaultTo(false);

    table.string('secret_mfa')
      .nullable()
      .defaultTo(null);

    table.timestamps();

    table.foreign('permission_id', 'fk_permission_id_users')
      .references('id')
      .inTable('permissions')
      .onDelete('RESTRICT')
      .onUpdate('NO ACTION');

    table.foreign('process_approver_id', 'fk_process_approver')
      .references('id')
      .inTable('users')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
