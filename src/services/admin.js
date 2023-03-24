const db = require('./db');
// const helper = require('../helper')

async function getAll() {
    return await db.query(`SELECT * FROM Admin`);
}
// * Queries the database for a singular item based on APTID
async function getOne(username) {
    data = await db.query(`SELECT * FROM Admin WHERE AdminUsername=\"${username}\"`);
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
    await db.query(`DELETE FROM Admin WHERE AdminUsername=\"${username}\"`);
    data = getOne(username);
    return data;
}

module.exports = {
    getAll,
    getOne
}