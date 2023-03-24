var mysql = require('mysql2/promise');
const crypto = require('crypto');
const config = require('../../.settings.json');

async function AuthenticateUser(username, password){
    data = await query(`SELECT PasswordHash, Salt FROM Admin WHERE AdminUsername='${username}'`);
    console.log("data = " + data);
    if(data.length === 0){
        return false;
    }
    hashGiven = crypto.createHash('sha256').update(password + data[0].Salt).digest('hex');
    console.log("Hashed given password with salt:\t" + hashGiven);
    console.log("Stored Hash:\t\t\t\t" + data[0].PasswordHash);
    if (hashGiven === data[0].PasswordHash){
        return true;
    } else {
        return false;
    }
}

async function query(sql, params) {
    db = {
        "host": config.host,
        "user": config.user,
        "password": config.password,
        "database": config.database
    }
    const connection = await mysql.createConnection(db);
    const [results,] = await connection.execute(sql, params);

    return results;
}

module.exports = {
    AuthenticateUser
}
