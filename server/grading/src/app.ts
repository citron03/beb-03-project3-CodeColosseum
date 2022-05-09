import express from "express";
import gradingRouter from "./routes/grading";

const app = express();
const port = 3003;

app.use(express.json());

app.use("/grading", gradingRouter);

app.listen(port, () => {
  console.log("start grading server");
});
