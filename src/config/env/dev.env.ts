import { ConnectionOptions } from "typeorm";

let dbOptions: ConnectionOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "develop",
  password: "AbCd1234",
  database: "akemi3",
  entities: ["src/data/entity/**/*{.ts,.js}"],
  migrations: ["src/data/migration/**/*{.ts,.js}"],
  cli: {
    migrationsDir: "src/data/migration",
  },
  logging: true,
  logger: "advanced-console",
};

export default {
  port: 8080,
  db: dbOptions,
  smtp: {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "juanandresra@ufps.edu.co",
      pass: "juanandres2412",
    },
  },
  shared: {
    FACEBOOK_ID: "",
    FACEBOOK_SECRET: "",
  },
};
