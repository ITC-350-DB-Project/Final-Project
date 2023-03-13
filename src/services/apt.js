const db = require('./db');
const helper = require('../helper')
const config = require('../../.settings.json');

async function getAll() {
    const rows = await db.query(
        `SELECT * FROM APT`
    );
    const data = rows;

    return data;
}

module.exports = {
    getAll
}