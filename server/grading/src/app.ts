import express from "express";
import gradingRouter from "./routes/grading";
import newGradingRouter from "./routes/newGrading";

const app = express();
const port = 3003;

app.use(express.json());

app.use("/grading", gradingRouter);

// app.use("/newgrading", newGradingRouter);

app.listen(port, () => {
  console.log("start grading server");
});
