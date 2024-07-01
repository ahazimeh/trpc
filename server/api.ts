import {initTRPC} from "@trpc/server";
import {createExpressMiddleware} from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";

const t = initTRPC.create();

const appRouter = t.router({
  sayHi : t.procedure.query(() => { return "Hi"; }),
  logToServer : t.procedure
                    .input((v) => {
                      if (typeof v === "string")
                        return v;

                      throw new Error("Invalid input: Expected string");
                    })
                    .mutation((req) => {
                      console.log(`Client Says: ${req.input}`);
                      return true;
                    }),
});

const app = express();

app.use(cors({origin : "http://localhost:5173"}));
app.use("/trpc", createExpressMiddleware({router : appRouter}))

console.log("aaaaahi1");

app.listen(3000);

export type AppRouter = typeof appRouter
