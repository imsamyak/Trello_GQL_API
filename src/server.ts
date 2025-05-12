import dotenv from "dotenv";
dotenv.config();

import { startStandaloneServer } from "@apollo/server/standalone";
import { app } from "./app";
import { connectDB } from "./utils/connect-db";

async function startServer() {
  try {
    await connectDB();

    const { url } = await startStandaloneServer(app, {
      listen: { port: Number(process.env.port) || 4000 },
    });

    console.log(`Server ready at ${url}`);
  } catch (err) {

    console.log(err);
    process.exit(1);

  } 
}


startServer();
