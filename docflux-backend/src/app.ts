import express from "express";
import cors from "cors";
import { createPdf, PDF_STORE_PATH } from "./pdf-creater";
import { AddOrderInput, Template } from "./generated/graphql-types";
import resolvers from "./resolvers";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";

const typeDefs = `
  #graphql
  ${require("fs").readFileSync(require.resolve("./schema.graphql"), "utf8")}`;

const app = express();

app.get("/welcome", (req, res) => {
  res.send("Welcome to Docflux!");
});

app.get("/download-pdf", (req, res) => {
  res.download(PDF_STORE_PATH + "/contract.pdf");
});

/*app.post("/create-pdf", (req, res) => {
    const order: OrderDto = req.body as OrderDto;
    createPdf(order);
    res.sendStatus(200);
});*/

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function start(): Promise<void> {
  await server.start();
}

start().then(() => {
  // middleware
  app.use(cors(), express.json(), expressMiddleware(server));

  const PORT = 8000;

  app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
  });
});
