const db = require('./db');
// const helper = require('../helper')

async function createAdmin(username, Fname, Lname, Password, Salt) {
    return await db.query(`INSERT INTO Admin (AdminUsername, AdminFName, AdminLName, DateCreated, PasswordHash, Salt, AdminLastLogin) VALUES (${username}, ${Fname}, ${Lname}, ${Date.timeNow()}, ${password}, ${salt}, ${Date.timeNow()})`)
}

async function getAll() {
    return await db.query(`SELECT * FROM Admin`);
}
// * Queries the database for a singular item based on APTID
async function getOne(username) {
    data = await db.query(`SELECT * FROM Admin WHERE AdminUsername=\"${username}\"`); // ! This should probably not return the hashed passwords from the database, we don't want this to expose passwords
    // * If there was no data found in the database matching the provided ID then return an error message
    if (data.length == 0) {
        data = [{ "Response": "Not Found" }]
    }
    return data;
}

async function updatePassword() {
    // TODO: Figure out how passwords are hashed + salted and if that needs to be done here or just simply saving to the database
}

async function deleteAdmin(username) {
    data = await db.query(`DELETE FROM Admin WHERE AdminUsername=\"${username}\"`);
    if (data.affectedRows != 0){
        data = [{"Response": "Delete Successful"}]
    }
    else {
        data = [{"Response": "Delete Failed"}]
    }
    return data;
}

module.exports = {
    createAdmin,
    getAll,
    getOne,
    updatePassword,
    deleteAdmin
}