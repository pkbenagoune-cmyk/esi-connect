const express = require("express");
const cors = require("cors");

const indexRouter = require("./routes");
const subjectsRouter = require("./routes/subjects");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", indexRouter);

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
app.use("/api/subjects", subjectsRouter);