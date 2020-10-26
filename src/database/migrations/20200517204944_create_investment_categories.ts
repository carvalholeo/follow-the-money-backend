
import Knex from 'knex';

export function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('investment_categories', table => {
    table.increments('id')
      .primary();

    table.string('name', 100)
      .notNullable();
          
    table.timestamps();
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('investment_categories');
}
