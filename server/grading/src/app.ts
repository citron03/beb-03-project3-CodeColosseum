import cors from "cors";
import express from "express";
import gradingRouter from "./routes/grading";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;
const mainServerUrl = process.env.MAINSERVERURL || "http://localhost:4000";

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

app.listen(port, () => {
  console.log("start grading server");
});
