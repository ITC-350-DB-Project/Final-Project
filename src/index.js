const express = require("express");
const app = express();
const port = 3000;
const aptRouter = require("./routes/apt")
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.get("/", (req, res) => {
    res.json({ message: "API status: Connected!" });
});
app.use("/apt", aptRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

app.listen(port, () => {
    console.log(`API enabled and listening at http://localhost:${port}`);
});