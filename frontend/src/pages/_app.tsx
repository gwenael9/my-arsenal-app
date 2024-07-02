import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/client";
import { LangueProvider } from "@/components/Layout/LangueContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <LangueProvider>
        <Component {...pageProps} />
      </LangueProvider>
    </ApolloProvider>
  );
}
