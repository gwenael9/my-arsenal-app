import datasource from "./lib/datasource";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import "reflect-metadata";
import PlayerResolver from "./resolvers/player.resolver";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { startStandaloneServer } from "@apollo/server/standalone";
import GoalResolver from "./resolvers/goal.resolver";
import express from "express";
import cors from "cors";
import http from "http";
import { expressMiddleware } from "@apollo/server/express4";

interface MyContext {};

const port = 4000;
const app = express();
const httpServer = http.createServer(app);

// buildSchema({
//   resolvers: [PlayerResolver, GoalResolver],
// }).then(async (schema) => {
//   await datasource.initialize();
//   const server = new ApolloServer({ schema });
//   const { url } = await startStandaloneServer(server, { listen: { port } });
//   console.log(`graphql server listening on ${url} zebiiiiiiiiiiii`);
// });

async function main() {
  const schema = await buildSchema({
    resolvers: [PlayerResolver, GoalResolver],
  });
  const server = new ApolloServer<MyContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });
  await server.start();
  app.use(
    "/",
    cors<cors.CorsRequest>({
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {})
  );
  await datasource.initialize();
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: port }, resolve)
  );
  console.log(`graphql server listening on ${port} zebiiiiiiiiiiii`);
}

main();
