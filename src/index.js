const express = require("express");
const app = express();
const port = 3000;
const path = require('path');
const aptRouter = require("./routes/apt")
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
// * Return data for the default response
// app.get("/", (req, res) => {
//     res.json({ message: "API status: Connected!" });
// });

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the Bootstrap CSS and JS files
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/html/index.html'));
});

app.get("/navbar", (req, res) => {
    res.sendFile(path.join(__dirname, '/html/navbar.html'));
});

app.get("/database", (req, res) => {
    res.sendFile(path.join(__dirname, '/html/database.html'));
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, '/html/admin.html'));
});

app.get("/background-image", (req, res) => {
    res.sendFile(path.join(__dirname, '/img/background-image.jpg'));
});

app.get("/css/style.css", (req, res) => {
    res.sendFile(path.join(__dirname, '/css/style.css'));
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