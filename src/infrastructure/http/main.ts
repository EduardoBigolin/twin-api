import { mongoConnect } from "../db/mongodb/connect";
import { DataSync } from "../db/sync-data";
import { Server } from "./express/Server";

const PORT = 3000;

mongoConnect().catch((err) => console.log(err));

new Server(PORT).start();

const dataSync = new DataSync();
dataSync.startSync();
