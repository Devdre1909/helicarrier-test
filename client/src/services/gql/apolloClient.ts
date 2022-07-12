import { ApolloClient, InMemoryCache } from "@apollo/client/core";

const url: string =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3002/"
    : "https://mfbqc6-3002.sse.codesandbox.io/";

const client = new ApolloClient({
  uri: url,
  cache: new InMemoryCache(),
});

export default client;
