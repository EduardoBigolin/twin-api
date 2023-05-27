import cors from "cors";
import express, { Application } from "express";
import { routes } from "./routes";

export class Server {
  private app: Application = express();
  constructor(private PORT: number) {}

  start() {
    this.middleware();
    this.routes();
    this.app.listen(this.PORT, () => {
      console.log(`[HTTP] Server running on http://localhost:${3000}`);
    });
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  routes() {
    this.app.use("/api", routes);
  }
}
