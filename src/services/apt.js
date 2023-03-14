const db = require('./db');
// const helper = require('../helper')

async function getAll() {
    return await db.query(`SELECT * FROM APT`);
}
// * Queries the database for a singular item based on APTID
async function getOne(id){
    data = await db.query(`SELECT * FROM APT WHERE APTID=${id}`);
    // * If there was no data found in the database matching the provided ID then return an error message
    if (data.length == 0){
        data = [{"Response": "Not Found"}]
    }
    return data;
}

module.exports = {
    getAll,
    getOne
}