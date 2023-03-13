import { connect, connection } from "mongoose";

const conn = {
  isConnected: false,
};

export const dbConnect = async () => {
  if (conn.isConnected) return;

  const db = await connect("mongodb://127.0.0.1:27017/tasksdb");

  conn.isConnected = db.connections[0].readyState;

  console.log(db.connection.db.databaseName);
};

connection.on("connected", () => {
  console.log("MongoDB is connected");
});

connection.on("error", (err) => {
  console.log(err);
});
