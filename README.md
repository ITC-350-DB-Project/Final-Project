# API

## Setup:
copy and rename the `settings.example` file to `.settings.json` and set the values to connect to the database

then run 
```bash
npm run dev
```
to enter developer mode. This will automatically reload the API every time that you save a file

If you just want to start the API without devtools run
```bash
npm run start
```

## Endpoints:
CREATE (POST): `/api/apt`: creates a new APT with data provided. Required fields: aptNation, aptDesc, aptFirstSeen, aptName

CREATE (POST): `/api/admin`: creates a new Admin with data provided. Required fields: username, fname, lname, password (In plaintext. It's hashed on the server)

GET: `/api/apt`: lists all APTs from the database

GET: `/api/apt/{id}`: queries the DB for a specific APT based on APTID

GET: `/api/admin`: lists all Admins from the database

GET: `/api/admin/{username}`: lists information about a specific Admin based on AdminUsername

UPDATE (PUT): `/api/apt/{id}`: updates APT information with data provided

UPDATE (PUT): `/api/admin/{username}`: updates the password for the Admin

DELETE: `/api/apt/{id}`: deletes an APT matching the ID provided

DELETE: `/api/admin/{username}`: deletes an Admin matching the username provided


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
## Back-end Code

### Javascript (Nodejs)

**/src/index.js:** project root file that defines the whole application, where to route URI requests, and implements sessions

**/src/routes/admin.js:** defines the routes for the admin portion of the API

**/src/routes/apt.js:** defines the routes for the apt portion of the API

**/src/services/admin.js:** has functions for dealing with administrative functions

**/src/services/apt.js:** has functions for dealing with APT creation, etc.

**/src/services/auth.js:** has functions for authenticating a user

**/src/services/db.js:** defines the database connection for the rest of the application to use

<br>

## Front-end Code

**/src/css/style.css:** CSS file that holds the visual definitions for the UI

**/src/css/img/background-image.jpg:** background image for all UI pages

### HTML

**/src/html/apt.html:** page that shows the information for a singular APT

**/src/html/index.html:** root application page that show the list of all APTs

**/src/html/login.html:** login page for admins

**/src/html/navbar.html:** navbar code that is included on every page

**/src/html/admin/admin_apt.html:** page that lists all of the APTs in the system and has links to edit/delete them

**/src/html/admin/create_admin.html:** page to create a new administrator account

**/src/html/admin/create_apt.html:** page to create a new APT entry

**/src/html/admin/index.html:** landing page for when an admin logs in

**/src/html/admin/update_admin.html:** page to update the information for an admin

**/src/html/admin/update_apt.html:** page to update the information for an APT

**/src/html/admin/users.html:** page that lists all admins in the system
