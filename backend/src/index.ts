import datasource from "./lib/datasource";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import "reflect-metadata";
import PlayerResolver from "./resolvers/player.resolver";
import { startStandaloneServer } from "@apollo/server/standalone";

const port = 4001;

buildSchema({
  resolvers: [PlayerResolver],
}).then(async (schema) => {
  await datasource.initialize();
  const server = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(server, { listen: { port } });
  console.log(`graphql server listening on ${url} zebiiiiiiiiiiii`);
});