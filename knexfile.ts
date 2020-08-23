import path from "path";
// Update with your config settings.

module.exports = {

  development: {
    client: "mysql",
    version: 10,
    connection: {
      host : "127.0.0.1",
      database: "ftm",
      user:     "ftm",
      password: "6v47CHqsCJBj0kkZ"
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "migrations"),
      extension: "ts",
      tableName: "knex_migrations"
    },
    seeds: {
      directory: path.resolve(__dirname, "src", "database", "seeds"),
      extension: "ts"
    },
    pool: {
      min: 1,
      max: 10
    },
    useNullAsDefault: true,
    acquireConnectionTimeout: 10000,
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "src", "database", "test.sqlite")
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "migrations"),
      extension: "ts",
      tableName: "knex_migrations"
    },
    seeds: {
      directory: path.resolve(__dirname, "src", "database", "seeds"),
      extension: "ts"
    },
    pool: {
      min: 1,
      max: 10
    },
    useNullAsDefault: true,
    acquireConnectionTimeout: 10000,
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
      directory: path.resolve(__dirname, "src", "database", "migrations"),
      extension: "ts",
      tableName: "knex_migrations"
    },
    seeds: {
      directory: path.resolve(__dirname, "src", "database", "seeds"),
      extension: "ts"
    },
    pool: {
      min: 1,
      max: 10
    },
    useNullAsDefault: true,
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
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "migrations"),
      extension: "ts",
      tableName: "knex_migrations"
    },
    seeds: {
      directory: path.resolve(__dirname, "src", "database", "seeds"),
      extension: "ts"
    },
    pool: {
      min: 1,
      max: 10
    },
    useNullAsDefault: true,
    acquireConnectionTimeout: 10000,
  }

};
