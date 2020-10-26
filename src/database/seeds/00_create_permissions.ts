import * as Knex from 'knex';

export function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const dateTime = new Date();

  return knex('permissions')
    .insert([
      {
        name: 'Customer',

        create_own_records: true,
        create_roles_permissions: false,
        create_system_users: false,
        create_user_options: false,

        read_access_logs: false,
        read_customers_users: false,
        read_own_records: true,
        read_system_configs: false,
        read_system_log: false,
        read_system_users: false,
        read_third_party_records: false,
        read_user_informations: false,
        read_user_roles: false,

        update_customers_users: false,
        update_own_records: true,
        update_roles_permissions: false,
        update_system_configs: false,
        update_system_users: false,
        update_third_party_records: false,
        update_user_email: false,
        update_user_roles: false,

        delete_own_records: true,
        delete_third_party_records: false,

        able_disable_user: false,
        remove_2fa: false,
        reset_password: false,
        need_have_2fa: false,
        need_have_approval: false,

        is_admin: false,
        is_staff: false,
        is_root_admin: false,

        created_at: dateTime,
        updated_at: dateTime
      },
      { 
        name: 'Technical Support',

        create_own_records: true,
        create_roles_permissions: false,
        create_system_users: false,
        create_user_options: true,

        read_access_logs: true,
        read_customers_users: true,
        read_own_records: true,
        read_system_configs: true,
        read_system_log: true,
        read_system_users: false,
        read_third_party_records: true,
        read_user_informations: true,
        read_user_roles: true,

        update_customers_users: true,
        update_own_records: true,
        update_roles_permissions: false,
        update_system_configs: false,
        update_system_users: false,
        update_third_party_records: false,
        update_user_email: true,
        update_user_roles: false,

        delete_own_records: true,
        delete_third_party_records: false,

        able_disable_user: true,
        remove_2fa: false,
        reset_password: true,
        need_have_2fa: false,
        need_have_approval: false,

        is_admin: false,
        is_staff: true,
        is_root_admin: false,

        created_at: dateTime,
        updated_at: dateTime
      },
      { 
        name: 'System Analyst',

        create_own_records: true,
        create_roles_permissions: false,
        create_system_users: false,
        create_user_options: false,

        read_access_logs: true,
        read_customers_users: true,
        read_own_records: true,
        read_system_configs: true,
        read_system_log: true,
        read_system_users: true,
        read_third_party_records: false,
        read_user_informations: true,
        read_user_roles: true,

        update_customers_users: false,
        update_own_records: true,
        update_roles_permissions: false,
        update_system_configs: false,
        update_system_users: false,
        update_third_party_records: false,
        update_user_email: false,
        update_user_roles: false,

        delete_own_records: true,
        delete_third_party_records: false,

        able_disable_user: false,
        remove_2fa: false,
        reset_password: false,
        need_have_2fa: false,
        need_have_approval: false,

        is_admin: false,
        is_staff: true,
        is_root_admin: false,

        created_at: dateTime,
        updated_at: dateTime
      },
      { 
        name: 'Developer',

        create_own_records: true,
        create_roles_permissions: false,
        create_system_users: false,
        create_user_options: false,

        read_access_logs: true,
        read_customers_users: true,
        read_own_records: true,
        read_system_configs: true,
        read_system_log: true,
        read_system_users: true,
        read_third_party_records: false,
        read_user_informations: true,
        read_user_roles: true,

        update_customers_users: false,
        update_own_records: true,
        update_roles_permissions: false,
        update_system_configs: false,
        update_system_users: false,
        update_third_party_records: false,
        update_user_email: false,
        update_user_roles: false,

        delete_own_records: true,
        delete_third_party_records: false,

        able_disable_user: false,
        remove_2fa: false,
        reset_password: false,
        need_have_2fa: false,
        need_have_approval: false,

        is_admin: false,
        is_staff: true,
        is_root_admin: false,

        created_at: dateTime,
        updated_at: dateTime
      },
      { 
        name: 'HR',

        create_own_records: true,
        create_roles_permissions: false,
        create_system_users: true,
        create_user_options: false,

        read_access_logs: true,
        read_customers_users: true,
        read_own_records: true,
        read_system_configs: false,
        read_system_log: true,
        read_system_users: true,
        read_third_party_records: false,
        read_user_informations: true,
        read_user_roles: true,

        update_customers_users: false,
        update_own_records: true,
        update_roles_permissions: false,
        update_system_configs: false,
        update_system_users: true,
        update_third_party_records: false,
        update_user_email: true,
        update_user_roles: true,

        delete_own_records: true,
        delete_third_party_records: false,

        able_disable_user: true,
        remove_2fa: false,
        reset_password: true,
        need_have_2fa: false,
        need_have_approval: true,

        is_admin: true,
        is_staff: true,
        is_root_admin: false,

        created_at: dateTime,
        updated_at: dateTime
      },
      { 
        name: 'Legal',

        create_own_records: true,
        create_roles_permissions: false,
        create_system_users: false,
        create_user_options: true,

        read_access_logs: true,
        read_customers_users: true,
        read_own_records: true,
        read_system_configs: true,
        read_system_log: true,
        read_system_users: true,
        read_third_party_records: true,
        read_user_informations: true,
        read_user_roles: true,

        update_customers_users: false,
        update_own_records: true,
        update_roles_permissions: false,
        update_system_configs: false,
        update_system_users: false,
        update_third_party_records: false,
        update_user_email: false,
        update_user_roles: false,

        delete_own_records: true,
        delete_third_party_records: false,

        able_disable_user: false,
        remove_2fa: false,
        reset_password: false,
        need_have_2fa: true,
        need_have_approval: true,

        is_admin: true,
        is_staff: true,
        is_root_admin: false,

        created_at: dateTime,
        updated_at: dateTime
      },
      { 
        name: 'Root',

        create_own_records: true,
        create_roles_permissions: true,
        create_system_users: true,
        create_user_options: false,

        read_access_logs: true,
        read_customers_users: true,
        read_own_records: true,
        read_system_configs: true,
        read_system_log: true,
        read_system_users: true,
        read_third_party_records: false,
        read_user_informations: true,
        read_user_roles: true,

        update_customers_users: true,
        update_own_records: true,
        update_roles_permissions: true,
        update_system_configs: true,
        update_system_users: true,
        update_third_party_records: false,
        update_user_email: true,
        update_user_roles: true,

        delete_own_records: true,
        delete_third_party_records: false,

        able_disable_user: true,
        remove_2fa: true,
        reset_password: true,
        need_have_2fa: true,
        need_have_approval: true,

        is_admin: true,
        is_staff: true,
        is_root_admin: true,

        created_at: dateTime,
        updated_at: dateTime
      },
    ]);

}
