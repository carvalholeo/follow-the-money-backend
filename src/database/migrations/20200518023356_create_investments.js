
exports.up = function(knex) {
  return knex.schema.createTable('investments', function(table) {
    table.increments('id')
      .primary();

    table.string('description', 50)
      .notNullable();

    table.integer('investment_type_id')
      .unsigned()      
      .notNullable();

    table.integer('investment_category_id')
      .unsigned()
      .notNullable();

    table.string('broker', 100)
      .notNullable();

    table.string('source')
      .defaultTo('Salário');

    table.datetime('investment_date')
      .notNullable();

    table.float('quantity')
      .notNullable()
      .defaultTo(1);

    table.float('unitary_value')
      .notNullable();

    table.float('amount_invested')
      .notNullable();

    table.float('amount_taxfree');
    table.float('amount_withtax');
    table.float('amount_redeemed');
    table.date('reference_month')
      .notNullable()
      .defaultTo(knex.fn.now());

    table.date('expected_date');
    table.integer('user_id')
      .unsigned()
      .notNullable();

    table.timestamps();


    table.foreign('investment_type_id', 'fk_investment_type')
      .references('id')
      .inTable('investment_types')
      .onDelete('RESTRICT')
      .onUpdate('NO ACTION');

    table.foreign('investment_category_id', 'fk_investment_category')
      .references('id')
      .inTable('investment_categories')
      .onDelete('RESTRICT')
      .onUpdate('NO ACTION');

    table.foreign('user_id', 'fk_user_id_investment')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('NO ACTION');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('investments')
};
