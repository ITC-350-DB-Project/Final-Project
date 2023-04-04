const express = require('express');
const router = express.Router();
const admin = require('../services/admin');
const crypto = require('crypto');

// * Returns all Admins when querying with no ID
router.get('/', async function (req, res) {
    try {
        res.json(await admin.getAll());
    } catch (err) {
        console.error(`Error while getting Admins`, err.message);
        res.status(500).send(err);
    }
});

router.post('/', async function (req, res){
    try {
        salt = crypto.randomBytes(8).toString('hex');
        //console.log(salt)
        password = crypto.createHash('sha256').update(req.body.password + salt).digest('hex');
        //console.log(req.body.password);
        //console.log(password);
        res.json(await admin.createAdmin(req.body.username, req.body.fname, req.body.lname, password, salt));
    } catch (err) {
        console.error(`Error while creating new Admin`, err.message);
        res.status(500).send(err);
    }
});

// * Returns a specific Admin when querying with an ID
router.get('/:username', async function (req, res) {
    try {
        res.json(await admin.getOne(req.params.username))
    } catch (err) {
        console.error(`Error while fetching Username:${req.params.username} from DB`);
        res.status(500).send(err);
    }
});
// ! This will need authentication from the user
router.delete('/:username', async function (req, res) {
    try{
        res.json(await admin.deleteAdmin(req.params.username));
    } catch (err) {
        console.error("something went wrong");
        res.status(500).send(err);
    }
});

module.exports = router;