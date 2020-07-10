import express, { Application } from "express";
import morgan, { compile } from "morgan";
import IndexRoutes from "./routes/index.routes";
import { createConnection } from "typeorm";
import { db } from "./config/index";
import bodyParser from "body-parser";
import i18n from "i18n";
import { rootDir, env } from "./config/index";

const app = express();

export class App {
  private app: Application;

  constructor(private port?: number | string) {
    this.app = express(); 
    this.i18n();
    this.settings();
    this.middlewares();
    this.routes();
  }

  private settings() {
    this.app.set("port", this.port || process.env.PORT || 3000);
  }

  private middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(bodyParser());
  }

  private routes() {
    this.app.use("/:lang", IndexRoutes);
  }

  private i18n() {
    i18n.configure({
      locales: ["es", "en", "de"],
      queryParameter: "lang",
      logDebugFn: function (msg) { console.log("debug", msg);},
      directory: rootDir + (env === "production" ? "/dist" : "/src") + "/config/locales",
    });
    this.app.use("/:lang", function (req, res, next) {
      i18n.setLocale(req.params["lang"]);
      next();
    });
    this.app.use(i18n.init);   
  }

  async listen() {
    await createConnection(db)
      .then(async (connection) => {
        console.log("Connected to DB");
      })
      .catch((error) => console.log("TypeORM connection error: ", error));
    await this.app.listen(this.app.get("port"));
    console.log(`Server on port`, this.app.get("port"));
  }
}
