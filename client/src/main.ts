import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../server/api";

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
});

async function main() {
  // const result = client.sayHi.query();
  // console.log(result)
  // const result = await client.logToServer.mutate("Hi from client")
  // const result = await client.users.get.query({ userId: "1234" });
{/*const result = await client.users.update.mutate({
    userId: "23432",
    name: "Kyle",
  });*/}
  const result = await client.secretData.query()
  console.log(result);
}
main();
