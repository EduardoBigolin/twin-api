import { mongoConnect } from "../db/mongodb/connect";
import { Server } from "./express/Server";

const PORT = 3000;

mongoConnect().catch((err) => console.log(err));

new Server(PORT).start();
