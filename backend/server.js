const express = require("express");
const cors = require("cors");

const indexRouter = require("./routes");
const subjectsRouter = require("./routes/subjects");
const requestsRouter = require("./routes/requests");

const app = express();

const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use("/", indexRouter);
app.use("/api/subjects", subjectsRouter);
app.use("/api/requests", requestsRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})