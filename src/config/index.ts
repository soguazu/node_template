import app from "./app";
import cache from "./redis";
import convict from "convict";
import db from "./database";
import dotEnvExtended from "dotenv-extended";

// load environmental variable
dotEnvExtended.load({
  encoding: "utf8",
  silent: false,
  path: ".env",
  defaults: ".env.defaults",
  schema: ".env.schema",
  errorOnMissing: true,
  errorOnExtra: false,
  errorOnRegex: false,
  includeProcessEnv: false,
  assignToProcessEnv: true,
  overrideProcessEnv: false,
});

// Combine configuration
const configCombine = { app, db, cache };

const config = convict(configCombine);

// Perform validation
config.validate({ allowed: "strict" });

export default config;
