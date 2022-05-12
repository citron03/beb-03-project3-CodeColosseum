import config from './config';
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import routes from "./routes";

const { missionRouter, userRouter } = routes;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["OPTIONS", "GET", "POST", "PATCH", "PUT", "DELETE"],
  })
);

app.use(cookieParser());


// 몽고디비 연결
if (config.ENV.MONGO_URI) {
  mongoose
    .connect(config.ENV.MONGO_URI)
    .then(() => console.log(`mongodb ${config.ENV.MONGO_database} connected!!`))
    .catch((e) => {throw e});
} else {
    console.log(`mongodb not connected!! Because MONGO_URI is Undefined.`);
}


app.get("/", (req, res) => {
  res.send("Code Colosseum Main Server");
});

// routes
app.use("/user/", userRouter);
app.use("/mission/", missionRouter);


// HTTP SERVER
let server = app.listen(config.ENV.PORT, () =>
  console.log(`server runnning!! (PORT: ${config.ENV.PORT})`)
);

export = server;