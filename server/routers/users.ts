import { z } from "zod";
import { t } from "../trpc";
import { observable } from "@trpc/server/observable";
import { EventEmitter } from "stream";

const userProcedure = t.procedure.input(z.object({ userId: z.string() }));
const eventEmitter = new EventEmitter();

export const userRouter = t.router({
  get: userProcedure.query(({ input }) => {
    return { id: input.userId };
  }),
  update: userProcedure
    .input(z.object({ name: z.string() }))
    .output(z.object({ name: z.string(), id: z.string() }))
    .mutation((req) => {
      console.log(
        `updating user ${req.input.userId} to have the name ${req.input.name}`,
      );
    eventEmitter.emit("update",req.input.userId)
      return {
        id: req.input.userId,
        name: req.input.name,
        password: "1234sdf",
      };
    }),
  onUpdate: t.procedure.subscription(() => {
    return observable<string>((emit) => {
      eventEmitter.on("update", emit.next);

      return () => {
        eventEmitter.off("update", emit.next);
      };
    });
  }),
});
