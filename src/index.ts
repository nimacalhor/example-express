require("dotenv").config({
  path: `./.env`,
});
import createApp from "./app";
import { Server } from "http";

process.on("uncaughtException", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

let server: Server;

createApp().then((s) => s && (server = s));

["unhandledRejection", "SIGTERM"].forEach((e) =>
  process.on(e, (err: any) => {
    console.error({ e, err });
    server?.close(() => process.exit(1));
    process.exit(1);
  })
);
