import * as dev from "./env/dev.env";
import * as prod from "./env/prod.env";

 const env = (process.env.NODE_ENV =  process.env.NODE_ENV || "development");
let envConfig = env === "production" ? prod.default : dev.default;

export = {
    type: envConfig.db.type,
    host: envConfig.db.host,
    port: envConfig.db.port,
    username: envConfig.db.username,
    password: envConfig.db.password,
    database: envConfig.db.database,
    synchronize: false,
    entities: ["src/data/entity/**/*{.ts,.js}"],
    migrations: ["src/data/migration/**/*{.ts,.js}"],
    cli: { migrationsDir: "src/data/migration" },
};