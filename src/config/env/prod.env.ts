import { ConnectionOptions } from "typeorm";

let dbOptions: ConnectionOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "develop",
  password: "AbCd1234",
  database: "akemi3",
  entities: ["dist/data/entity/**/*{.ts,.js}"],
  migrations: ["dist/data/migration/**/*{.ts,.js}"],
  cli: {
    migrationsDir: "dist/data/migration",
  },
};

export default {
  port: 80,
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
  jwt_secret: 'Token produccion'
};
