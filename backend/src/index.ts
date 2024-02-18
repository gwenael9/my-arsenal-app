import datasource from "./lib/datasource";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import "reflect-metadata";
import PlayerResolver from "./resolvers/player.resolver";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import GoalResolver from "./resolvers/goal.resolver";
import express from "express";
import cors from "cors";
import http from "http";
import { expressMiddleware } from "@apollo/server/express4";

const port = 4000;
const app = express();
const httpServer = http.createServer(app);

async function main() {
  const schema = await buildSchema({
    resolvers: [PlayerResolver, GoalResolver],
  });
  const server = new ApolloServer({
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
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );
  await datasource.initialize();
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: port }, resolve)
  );
  console.log(`graphql server listening on ${port} zebiiiiiiiiiiii`);
}

main();
