import { z } from "zod";
import { t } from "../trpc";

const userProcedure = t.procedure.input(z.object({ userId: z.string() }));

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
      return { id: req.input.userId, name: req.input.name,  };
    }),
});
