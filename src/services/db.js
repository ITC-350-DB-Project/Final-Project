const mysql = require('mysql2/promise');
const config = require('../../.settings.json');

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
    query
}