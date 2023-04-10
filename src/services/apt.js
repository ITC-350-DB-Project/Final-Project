const db = require('./db');
// const helper = require('../helper')

// Still needs authentication
async function createOne(aptNation, aptDesc, aptFirstSeen, aptName, adminUsername, body){
    return await db.query(`INSERT INTO APT 
    (APTNationality, APTDescription, APTFirstSeen, DateUpdated, APTName, AdminUsername, UpdatedByAdminUsername) 
    VALUES ('${aptNation}', '${aptDesc}', '${aptFirstSeen}', NOW(), '${aptName}', '${adminUsername}', '${adminUsername}')`);
}

async function getAll() {
    return await db.query(`SELECT * FROM view_aptlist`);
}

async function getIDbyName(name) {
    return await db.query(`SELECT APTID FROM APT WHERE APTName = "${name}"`);
}

async function addSource(aptID, source) {
    return await db.query(`INSERT INTO Source (SourceURL, APTID) VALUES ("${source}", ${aptID});`);
}

// * Queries the database for a singular item based on APTID
async function getOne(id){
    data = await db.query(`SELECT APT.APTID AS ID, APT.APTName AS Name, APT.APTNationality AS Nationality, APT.APTDescription AS Description, view_aptlist.Aliases AS Aliases, view_aptlist.Types AS Types, APT.APTFirstSeen AS FirstSeen, APT.UpdatedByAdminUsername AS AdminLastUpdated, APT.DateUpdated As DateLastUpdated FROM APT JOIN view_aptlist on APT.APTID=view_aptlist.ID WHERE APTID=${id}`);
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

async function deleteOne(aptID){
    data = await db.query(`DELETE FROM Source WHERE APTID=${aptID}`);
    data = await db.query(`DELETE FROM APT WHERE APTID=${aptID}`);

    if (data.affectedRows != 0){
        data = [{"Response": "Delete Successful"}]
    }
    else {
        data = [{"Response": "Delete Failed"}]
    }
    return data;
}

async function getSources(aptID){
    data = await db.query(`SELECT SourceURL FROM Source WHERE APTID=${aptID}`);
    if (data.length == 0){
        data = [{"Response": "Not Found"}];
    }
    return data;
}

module.exports = {
    createOne,
    getAll,
    getOne,
    updateOne,
    deleteOne,
    getSources,
    getIDbyName,
    addSource
}
