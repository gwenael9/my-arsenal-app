import datasource from "./lib/datasource";
import { ApolloServer } from "@apollo/server";
import "reflect-metadata";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import cors from "cors";
import http from "http";
import { expressMiddleware } from "@apollo/server/express4";
import User from "./entities/user.entity";
import schemaPromise from "./schema"; 
import { jwtVerify } from "jose";
import UserService from "./services/user.service";
import Cookies from "cookies";

export interface MyContext {
  req: express.Request;
  res: express.Response;
  user: User | null;
}
export interface Payload {
  email: string;
}

const port = 4000;
const app = express();
const httpServer = http.createServer(app);

async function main() {
  const schema = await schemaPromise;

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
      context: async ({ req, res }) => {
        let user: User | null = null;
        const cookies = new Cookies(req, res);
        const token = cookies.get("token");
        if (token) {
          try {
            const verify = await jwtVerify<Payload>(
              token,
              new TextEncoder().encode(process.env.SECRET_KEY)
            );
            user = await new UserService().findUserByEmail(
              verify.payload.email
            );
          } catch (err) {
            cookies.set("token");
          }
        }
        return { req, res, user };
      }
    })
  );
  await datasource.initialize();
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: port }, resolve)
  );
  console.info(`graphql server listening on ${port}`);
}

main();
