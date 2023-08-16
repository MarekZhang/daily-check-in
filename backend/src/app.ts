import Koa from "koa";
import bodyParser from "koa-bodyparser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import router from "./routes";

dotenv.config();

const app = new Koa();
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoURI = `mongodb+srv://mongodb:${mongoPassword}@leetcode-daily-check-in.3kux0ol.mongodb.net/?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 3002;

mongoose.connect(mongoURI).then(async () => {
  console.log("succesfully connected to mongodb.");

  app.use(bodyParser());

  app.use(router.routes());

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
