db = require('./db');
const crypto = require('crypto');

async function AuthenticateUser(username, password){
    data = await db.query(`SELECT PasswordHash, Salt FROM admin WHERE AdminUsername='${username}'`);
    if(data.length === 0){
        return false;
    }
    //console.log(data[0].PasswordHash);
    hashGiven = crypto.createHash('sha256').update(password + data[0].Salt).digest('hex');
    console.log("Hashed given password with salt:\t" + hashGiven);
    console.log("Stored Hash:\t\t\t\t" + data[0].PasswordHash);
    if (hashGiven === data[0].PasswordHash){
        return true;
    } else {
        return false;
    }
}

module.exports = {
    AuthenticateUser
}