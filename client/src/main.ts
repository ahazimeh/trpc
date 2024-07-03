import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import { AppRouter } from "../../server/api";

const client = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink(),
    httpBatchLink({ // httpBatchLink is an ending link // httpLink same as httpBatchLink but it doesn't do any batching
      url: "http://localhost:3000/trpc",
      headers: { Authorization: "TOKEN" }
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
