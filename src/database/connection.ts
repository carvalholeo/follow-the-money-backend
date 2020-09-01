import knex from "knex";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const configuration = require("../../knexfile");
const environment = process.env.NODE_ENV || "development";

const config = configuration[environment];

const connection = knex(config);

export default connection;
