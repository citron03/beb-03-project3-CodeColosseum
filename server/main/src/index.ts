import "./config"
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import routes from "./routes";

const { PORT, MONGO_URI } = process.env;
const { missionRouter, userRouter } = routes;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["OPTIONS", "GET", "POST", "PATCH", "PUT"],
  })
);

app.use(cookieParser());


// 몽고디비 연결
if (MONGO_URI) {
    mongoose
      .connect(MONGO_URI)
      .then(() => console.log("mongodb connected!!"))
      .catch((e) => {throw e});
} else {
    console.log(`mongodb not connected!! Because MONGO_URI is Undefined.`);
}


// routes
app.get("/", (req, res) => {
  res.send("Code Colosseum Main Server");
});

app.use("/user/", userRouter);
app.use("/mission/", missionRouter);


// HTTP SERVER
let server = app.listen(PORT, () =>
  console.log(`server runnning!! (PORT: ${PORT})`)
);

export = server;