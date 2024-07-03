import { initTRPC } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { applyWSSHandler } from "@trpc/server/adapters/ws";
import cors from "cors";
import express from "express";
import { appRouter } from "./routers";
import { createContext } from "./context";
import ws from "ws";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

console.log("aaaaahi1");

const server = app.listen(3000);

applyWSSHandler({
  wss: new ws.Server({ server }),
  router: appRouter,
  createContext: () => {
    return {
      isAdmin: true
    }
  }
});

export type AppRouter = typeof appRouter;
