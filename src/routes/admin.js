const express = require('express');
const router = express.Router();
const admin = require('../services/admin');
const crypto = require('crypto');
const auth = require('../services/auth');

// * Returns all Admins when querying with no ID
router.get('/', auth.isAuthenticated, async function (req, res) {
    try {
        res.json(await admin.getAll());
    } catch (err) {
        console.error(`Error while getting Admins`, err.message);
        res.status(500).send(err);
    }
});

// Creates a new Admin
router.post('/', auth.isAuthenticated, async function (req, res){
    try {
        salt = crypto.randomBytes(8).toString('hex');
        password = crypto.createHash('sha256').update(req.body.password + salt).digest('hex');
        res.json(await admin.createAdmin(req.body.username, req.body.fname, req.body.lname, password, salt));
    } catch (err) {
        console.error(`Error while creating new Admin`, err.message);
        res.status(500).send(err);
    }
});

// * Returns a specific Admin when querying with an ID
router.get('/:username', auth.isAuthenticated, async function (req, res) {
    try {
        res.json(await admin.getOne(req.params.username))
    } catch (err) {
        console.error(`Error while fetching Username:${req.params.username} from DB`);
        res.status(500).send(err);
    }
});

// Deletes an admin
router.delete('/:username', auth.isAuthenticated, async function (req, res) {
    try{
        res.json(await admin.deleteAdmin(req.params.username));
    } catch (err) {
        console.error("something went wrong");
        res.status(500).send(err);
    }
});

module.exports = router;