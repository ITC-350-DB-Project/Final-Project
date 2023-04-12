const db = require('./db');
var mysql = require('mysql2/promise');
const crypto = require('crypto');
const config = require('../../.settings.json');

async function AuthenticateUser(username, password){
    data = await db.query(`SELECT PasswordHash, Salt FROM Admin WHERE AdminUsername= ?`, [username]);
    console.log("data = " + data);
    if(data.length === 0){
        return false;
    }
    hashGiven = crypto.createHash('sha256').update(password + data[0].Salt).digest('hex');
    console.log("Hashed given password with salt:\t" + hashGiven);
    console.log("Stored Hash:\t\t\t\t" + data[0].PasswordHash);
    if (hashGiven === data[0].PasswordHash){
        //update the time the user last logged in ie. NOW()
        data = await db.query(`UPDATE Admin SET AdminLastLogin=NOW() WHERE AdminUsername = ?`, [username]);
        return true;
    } else {
        return false;
    }
}

function isAuthenticated(req, res, next){
    if (req.session.user) {
        next();
    } else {
        next('route');
    }
}

module.exports = {
    AuthenticateUser,
    isAuthenticated
}
