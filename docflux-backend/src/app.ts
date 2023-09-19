import express from "express";
import cors from "cors";
import { PDF_STORE_PATH } from "./pdf-creater";
import resolvers from "./resolvers";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import { MongoClient } from "mongodb";

const MONGO_CONNECTION_STRING = "mongodb://root:rootpassword@localhost:27017/";
export let DB_CONN;

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

start().then(async () => {
  // middleware
  app.use(cors(), express.json(), expressMiddleware(server));

  console.log("STEP 1");

  const client = new MongoClient(MONGO_CONNECTION_STRING, {});
  DB_CONN = await client.connect();

  console.log("STEP 2");

  const PORT = 8000;

  app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
  });
});
