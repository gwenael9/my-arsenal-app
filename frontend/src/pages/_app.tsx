import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export default function App({ Component, pageProps }: AppProps) {

  const client = new ApolloClient({
    uri: "http://localhost:4001",
    cache: new InMemoryCache(),
    credentials: "include"
  })

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}