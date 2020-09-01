import path from "path";

const database = process.env.DB_DATABASE || "ftm";
const username = process.env.DB_USER || "root";
const password = process.env.DB_PASSWORD || "";
const client = process.env.DB_CLIENT || "mysql";
const host = process.env.DB_HOST || "localhost";
const port = Number(process.env.DB_PORT) || 3306;
const poolMin = Number(process.env.DB_POOL_MIN) || 0;
const poolMax = Number(process.env.DB_POOL_MAX) || 5;
const nullAsDefault = process.env.DB_USE_NULL_AS_DEFAULT || true;
const acquireConnectionTimeout = Number(process.env.DB_ACQUIRE_CONNECTION_TIMEOUT) || 10000;
const connectionString =  `${client}://${username}:${password}@${host}:${port}/${database}`

module.exports = {

  development: {
    client: client,
    connection: connectionString,
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
      min: poolMin,
      max: poolMax
    },
    useNullAsDefault: nullAsDefault,
    acquireConnectionTimeout: acquireConnectionTimeout,
  },

  test: {
    client: client,
    connection: connectionString,
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
      min: poolMin,
      max: poolMax
    },
    useNullAsDefault: nullAsDefault,
    acquireConnectionTimeout: acquireConnectionTimeout,
  },

  staging: {
    client: client,
    connection: connectionString,
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
      min: poolMin,
      max: poolMax
    },
    useNullAsDefault: nullAsDefault,
    acquireConnectionTimeout: acquireConnectionTimeout,
  },

  production: {
    client: client,
    connection: connectionString,
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
      min: poolMin,
      max: poolMax
    },
    useNullAsDefault: nullAsDefault,
    acquireConnectionTimeout: acquireConnectionTimeout,
  }
};
