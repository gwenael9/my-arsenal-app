import { ApolloClient, InMemoryCache } from "@apollo/client";

const devApiUrl = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;

const client = new ApolloClient({
  uri: devApiUrl ? devApiUrl : "/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

export default client;
