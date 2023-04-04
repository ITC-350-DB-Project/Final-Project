const db = require('./db');
// const helper = require('../helper')

// Still needs authentication
async function createOne(aptNation, aptDesc, aptFirstSeen, aptName, adminUsername){
    return await db.query(`INSERT INTO APT 
    (APTNationality, APTDescription, APTFirstSeen, DateUpdated, APTName, AdminUsername, UpdatedByAdminUsername) 
    VALUES ('${aptNation}', '${aptDesc}', '${aptFirstSeen}', NOW(), '${aptName}', '${adminUsername}', '${adminUsername}')`);
}

async function getAll() {
    return await db.query(`SELECT * FROM view_aptlist`);
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

async function updateOne(aptID, aptNation, aptDesc, aptName, adminUsername){
    data = await db.query(`UPDATE APT
    SET APTNation=\"${aptNation}\", APTDescription=\"${aptDesc}\", APTName=\"${aptName}\", UpdatedByAdminUsername=\"${adminUsername}"
    WHERE APTID=\"${aptID}\"`);
    if (data.affectedRows != 0){
        data = [{"Response": "Update Successful"}]
    }
    else {
        data = [{"Response": "Update Failed"}]
    }
    return data
}

// Still needs authentication
async function deleteOne(aptID){
    data = await db.query(`DELETE FROM APT WHERE APTID=${aptID}`);
    if (data.affectedRows != 0){
        data = [{"Response": "Delete Successful"}]
    }
    else {
        data = [{"Response": "Delete Failed"}]
    }
    return data;
}
module.exports = {
    createOne,
    getAll,
    getOne,
    updateOne,
    deleteOne
}