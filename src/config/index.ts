import * as path from "path";

import * as dev from "./env/dev.env";
import * as prod from "./env/prod.env";

export const ip = process.env.IP || '0.0.0.0';
export const rootDir = path.normalize(__dirname + "/../..");
export const env = (process.env.NODE_ENV = process.env.NODE_ENV || "development");

let envConfig = env === "production" ? prod.default : dev.default;
export const db = envConfig.db
export const smtp = envConfig.smtp;

