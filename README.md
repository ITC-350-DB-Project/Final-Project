# API

## Setup:
copy and rename the `settings.example` file to `.settings.json` and set the values to connect to the database

then run 
```bash
node run dev
```
to enter developer mode. This will automatically reload the API every time that you save a file

If you just want to start the API without devtools run
```bash
node run start
```

## Endpoints:
`/api/apt`: lists all APTs from the database

`/api/apt/{id}`: queries the DB for a specific APT based on APTID

`/api/admin`: lists all Admins from the database

`/api/admin/{username}`: lists information about a specific Admin based on AdminUsername

# App Info

## Credentials:
Password format: SHA256(password + salt)

There is no space between the password and the salt when calculating the password hash. The salt is simply appended to the password and then hashed.

## Sessions + Authentication:
Every browser gets a session cookie when they visit any part of the website. You can go to `/login` to login with your username and password. If you authenticate properly, your cookie gets changed and your system is stored in the system as being an admin. If you logout (`/logout`) your session is destroyed and you are assigned a random new cookie.

To require authentication for any endpoint, add the middleware `isAuthenticated` to your `app.get` request.

Example:
```javascript
app.get("/admin", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '/html/admin.html'));
});
```
