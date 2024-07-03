import { initTRPC } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import { appRouter } from "./routers";
import { createContext } from "./context";

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

app.listen(3000);

export type AppRouter = typeof appRouter;
