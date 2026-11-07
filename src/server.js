import "dotenv/config";
import express from "express";
import appRouter from "./routers/index.js";

const app = express();
app.use(express.json());
app.use(appRouter);

app.listen(process.env.PORT, () => console.log("Server is running on", process.env.PORT));

