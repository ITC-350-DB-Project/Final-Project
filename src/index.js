const express = require("express");
const app = express();
const port = 3000;
const path = require('path');
const aptRouter = require("./routes/apt");
const adminRouter = require("./routes/admin");
const auth = require('./services/auth.js');
const sessions = require('express-session');

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(sessions({
    secret: "somerandomsecrettousetogeneratethesessionstuffthatisneededforittowork",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));


// * Return data for the default response
app.get("/api/", (req, res) => {
    res.json({ message: "API status: Connected!" });
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the Bootstrap CSS and JS files
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/html/index.html'));
});

// Return Login page
app.get("/login", (req, res) => {
    if(req.session.user){
        res.redirect('http://localhost:3000/admin');
    } else {
        res.sendFile(path.join(__dirname, '/html/login.html'));
    }
});

// Endpoint that handles the admin login from /login
app.post("/authenticate", async function (req, res) {
    console.log(req.body);
    try {
        rightCreds = await auth.AuthenticateUser(req.body.username, req.body.password);
        console.log("Creds found and match? " + rightCreds);
        if (rightCreds){
            req.session.regenerate(function (err){
                req.session.user = req.body.username;
                req.session.save(function (err){
                    res.redirect('http://localhost:3000/admin');
                });
            });
        } else {
            res.status(500).send("There is an error with your username or password!");
        }

    } catch (err) {
        console.error("Error Authenticating user\n" + err);
        res.status(500).send(err);
    }
});

app.get('/logout', function (req, res, next){
    req.session.user = null;
    req.session.save(function (err){
        if (err){
            next(err);
        }
        req.session.regenerate(function(err){
            res.redirect('/');
        })
    });
});

app.get("/navbar", (req, res) => {
    res.sendFile(path.join(__dirname, '/html/navbar.html'));
});
//I attempted to make a redirect here if the user isn't logged in. 
//It didn't seem to work - Tyler F.
//Will now redirect to the login page if the user is not logged in. - Jonathan W.
app.get("/admin", (req, res) => {
    if(!req.session.user){
        res.redirect('http://localhost:3000/login');
    } else {
        res.sendFile(path.join(__dirname, '/html/admin/index.html'));
    }
});

app.get("/admin/apt", auth.isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '/html/admin/admin_apt.html'));
});

app.get("/admin/users", auth.isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '/html/admin/users.html'));
});

app.get("/admin/create_apt", auth.isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '/html/admin/create_apt.html'));
});

app.get("/admin/create_admin", auth.isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '/html/admin/create_admin.html'));
});

app.get("/admin/update_apt/:id", auth.isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '/html/admin/update_apt.html'));
});

app.get("/admin/update_admin/:username", auth.isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '/html/admin/update_admin.html'));
});

app.get("/background-image", (req, res) => {
    res.sendFile(path.join(__dirname, '/img/background-image.jpg'));
});

app.get("/apt/*", (req, res) => {
    res.sendFile(path.join(__dirname, '/html/apt.html'));
});

// * Return data for the /apt subdomain
app.use("/api/apt", aptRouter);
app.use("/api/admin", adminRouter);

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
