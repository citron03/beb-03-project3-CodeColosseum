import { ENV } from './config';
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import routes from "./routes";
// import fs from "fs";
// import https from "https";
// import path from "path";

const { missionRouter, userRouter } = routes;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (!ENV.FRONT_SERVER) {throw new Error("FRONT_SERVER is not defined");}
app.use(
  cors({
    origin: [ENV.FRONT_SERVER],
    credentials: true,
    methods: ["OPTIONS", "GET", "POST", "PATCH", "PUT", "DELETE"],
  })
);

app.use(cookieParser());


// 몽고디비 연결
if (ENV.MONGO_URI) {
  mongoose
    .connect(ENV.MONGO_URI)
    .then(() => console.log(`mongodb ${ENV.MONGO_database} connected!!`))
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


let server;
// HTTP SERVER
server = app.listen(ENV.PORT, () =>
  console.log(`server runnning!! (PORT: ${ENV.PORT})`)
);

// // HTTPS/HTTP SERVER
// if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {

//   const dir = path.join(__dirname, "..")
//   const privateKey = fs.readFileSync(dir + "/key.pem", "utf8");
//   const certificate = fs.readFileSync(dir + "/cert.pem", "utf8");
//   const credentials = { key: privateKey, cert: certificate };

//   server = https.createServer(credentials, app);
//   server.listen(ENV.HTTPS_PORT, () => console.log(`HTTPS server runnning!! (PORT: ${ENV.HTTPS_PORT})`));

// } else {
//   server = app.listen(ENV.HTTP_PORT, () =>
//   console.log(`HTTP server runnning!! (PORT: ${ENV.HTTP_PORT})`)
//   );
// };
export = server;