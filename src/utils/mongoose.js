import { connect, connection } from "mongoose";

const conn = {
  isConnected: false,
};

export const dbConnect = async () => {
  if (conn.isConnected) return;

  const db = await connect("mongodb+srv://daivymorales:WaIgpVo2quGVJzMh@cluster0.5loi8zd.mongodb.net/?retryWrites=true&w=majority");

  conn.isConnected = db.connections[0].readyState;

  console.log(db.connection.db.databaseName);
};

connection.on("connected", () => {
  console.log("MongoDB is connected");
});

connection.on("error", (err) => {
  console.log(err);
});
