import path from "path";
// Update with your config settings.

module.exports = {

  development: {
    client: "mysql",
    connection: {
      host : "127.0.0.1",
      database: "ftm",
      user:     "root",
      password: ""
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "migrations"),
      extension: "ts",
      tableName: "knex_migrations"
    },
    pool: {
      min: 1,
      max: 10
    },
    seeds: {
      directory: path.resolve(__dirname, "src", "database", "seeds"),
      extension: "ts"
    },
    useNullAsDefault: true,
    acquireConnectionTimeout: 10000,
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: "./src/database/test.sqlite"
    },
    migrations: {
      directory: "./src/database/migrations",
      tableName: "knex_migrations"
    },
    useNullAsDefault: true,
  },

  staging: {
    client: "mysql",
    version: 10,
    connection: {
      host : "127.0.0.1",
      database: "ftm",
      user:     "root",
      password: ""
    },
    migrations: {
      directory: "./src/database/migrations",
      tableName: "knex_migrations"
    },
    pool: {
      min: 1,
      max: 10
    },
    acquireConnectionTimeout: 10000,
  },

  production: {
    client: "mysql",
    connection: {
      host : "127.0.0.1",
      database: "my_db",
      user:     "username",
      password: "password"
    },
    pool: {
      min: 1,
      max: 10
    },
    acquireConnectionTimeout: 10000,
    migrations: {
      directory: "./src/database/migrations",
      tableName: "knex_migrations"
    }
  }

};
