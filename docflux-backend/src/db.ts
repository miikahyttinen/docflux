import { DB_CONN } from "./app";
import { Order } from "./generated/graphql-types";

export const insertOrder = async (order: Order) => {
  const db = DB_CONN.db("docflux");
  try {
    await db.collection("orders").insertOne(order);
  } catch (e: any) {
    console.error(e);
  }
};

export const findAllOrders = async () => {
  const db = DB_CONN.db("docflux");
  try {
    const allOrders: Order[] = await db.collection("orders").find({}).toArray();
    console.log("ALL ORDERS: " + allOrders);
    return allOrders;
  } catch (e: any) {
    console.error(e);
  }
};
