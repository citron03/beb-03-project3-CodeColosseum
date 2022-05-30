import cors from "cors";
import express from "express";
import gradingRouter from "./routes/grading";
import https from "https";
import fs from "fs";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;
const mainServerUrl =
  process.env.MAINSERVERURL ||
  "http://codecolosseummain-env.eba-qkjzymcf.ap-northeast-2.elasticbeanstalk.com";

app.use(express.json());

app.use(
  cors({
    origin: [mainServerUrl],
    credentials: true,
    methods: ["POST"],
  })
);

app.use("/grading", gradingRouter);

// app.use("/newgrading", newGradingRouter);

if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };
  const server = https.createServer(credentials, app);
  server.listen(port, () => {
    console.log("start grading server : https");
  });
} else {
  app.listen(port, () => {
    console.log("start grading server : http");
  });
}
