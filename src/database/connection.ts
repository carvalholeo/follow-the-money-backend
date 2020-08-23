import knex from "knex";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const configuration = require("../../knexfile");

const config = process.env.NODE_ENV === "test" 
  ? configuration.test 
  : process.env.NODE_ENV === "development"
    ? configuration.development
    : configuration.production;

const connection = knex(config);

export default connection;