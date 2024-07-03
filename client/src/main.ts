import {
  createTRPCProxyClient,
  createWSClient,
  httpBatchLink,
  loggerLink,
  splitLink,
  wsLink,
} from "@trpc/client";
import { AppRouter } from "../../server/api";

const wsClient = createWSClient({
  url: "http://localhost:3000/trpc",
});
const client = createTRPCProxyClient<AppRouter>({
  links: [
    splitLink({
      condition: (op) => {
        return op.type === "subscription";
      },
      true: wsLink({
        client: wsClient,
      }),
      false: httpBatchLink({
        // httpBatchLink is an ending link // httpLink same as httpBatchLink but it doesn't do any batching
        url: "http://localhost:3000/trpc",
        headers: { Authorization: "TOKEN" },
      }),
    }),
    // loggerLink(),
  ],
});

document.addEventListener("click", () => {
  client.users.update.mutate({ userId: "1", name: "Kyle" });
});

async function main() {
  // const result = client.sayHi.query();
  // console.log(result)
  // const result = await client.logToServer.mutate("Hi from client")
  // const result = await client.users.get.query({ userId: "1234" });
  {
    /*const result = await client.users.update.mutate({
    userId: "23432",
    name: "Kyle",
  });*/
  }
  // const result = await client.secretData.query();
  // console.log(result);
  const connection = client.users.onUpdate.subscribe(
    undefined, // no input
    {
      onData: (id) => {
        console.log("Updated", id);
      },
    },
  );
  // wsClient.close(); // close connection
}
main();
