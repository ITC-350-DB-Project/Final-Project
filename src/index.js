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
// * Return data for the default response
app.get("/", (req, res) => {
    res.json({ message: "API status: Connected!" });
});

// * Return data for the /apt subdomain
app.use("/apt", aptRouter);

// * Error handling stuff
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

// * Open the port and print a message saying that the program started successfully
app.listen(port, () => {
    console.log(`API enabled and listening at http://localhost:${port}`);
});