import dotenv from "dotenv";
import path from "path";

const environmentVariables = path.resolve(__dirname, "..", "..", ".env.test");

export default dotenv.config({
  path: environmentVariables
});