import Knex from "knex";

export function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("permissions", table => {
    table.increments("id")
      .primary();

    table.string("name", 50)
      .unique()
      .notNullable();



    table.boolean("create_own_records")
      .notNullable()
      .defaultTo(true);
    
    table.boolean("create_roles_permissions")
      .notNullable()
      .defaultTo(false);

    table.boolean("create_system_users")
      .notNullable()
      .defaultTo(false);

    table.boolean("create_user_options")
      .notNullable()
      .defaultTo(false);



    table.boolean("read_access_logs")
      .notNullable()
      .defaultTo(false);

    table.boolean("read_customers_users")
      .notNullable()
      .defaultTo(false);

    table.boolean("read_own_records")
      .notNullable()
      .defaultTo(true);

    table.boolean("read_system_configs")
      .notNullable()
      .defaultTo(false);

    table.boolean("read_system_log")
      .notNullable()
      .defaultTo(false);

    table.boolean("read_system_users")
      .notNullable()
      .defaultTo(false);

    table.boolean("read_third_party_records")
      .notNullable()
      .defaultTo(false);

    table.boolean("read_user_informations")
      .notNullable()
      .defaultTo(false);
    
    table.boolean("read_user_roles")
      .notNullable()
      .defaultTo(false);



    table.boolean("update_customers_users")
      .notNullable()
      .defaultTo(false);

    table.boolean("update_own_records")
      .notNullable()
      .defaultTo(true);

    table.boolean("update_roles_permissions")
      .notNullable()
      .defaultTo(false);

    table.boolean("update_system_configs")
      .notNullable()
      .defaultTo(false);

    table.boolean("update_system_users")
      .notNullable()
      .defaultTo(false);

    table.boolean("update_third_party_records")
      .notNullable()
      .defaultTo(false);

    table.boolean("update_user_email")
      .notNullable()
      .defaultTo(false);

    table.boolean("update_user_roles")
      .notNullable()
      .defaultTo(false);



    table.boolean("delete_own_records")
      .notNullable()
      .defaultTo(true);

    table.boolean("delete_third_party_records")
      .notNullable()
      .defaultTo(false);



    table.boolean("able_disable_user")
      .notNullable()
      .defaultTo(false);

    table.boolean("remove_2fa")
      .notNullable()
      .defaultTo(false);

    table.boolean("reset_password")
      .notNullable()
      .defaultTo(false);

    table.boolean("need_have_2fa")
      .notNullable()
      .defaultTo(false);

    table.boolean("need_have_approval")
      .notNullable()
      .defaultTo(false);


    table.boolean("is_admin")
      .notNullable()
      .defaultTo(false);

    table.boolean("is_staff")
      .notNullable()
      .defaultTo(false);

    table.boolean("is_root_admin")
      .notNullable()
      .defaultTo(false);

    table.timestamps();

    table.index("id");
  });
}

export function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("permissions");
}
