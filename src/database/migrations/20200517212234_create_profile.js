
exports.up = function(knex) {
  return knex.schema.createTable('profile', function(table) {
      table.increments('id')
        .primary();
      
      table.string('first_name');
      table.string('surname');
      table.string('url_photo');
      table.date('birthday');
      table.text('biography', 'longtext');
      table.string('facebook_profile');
      table.string('twitter_profile');
      table.string('instagram_profile');
      table.string('personal_site_url');
      table.integer('user_id')
        .unsigned()
        .notNullable();

      table.timestamps();

      table.foreign('user_id', 'fk_user_id_profile')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('NO ACTION');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('profile');
};
