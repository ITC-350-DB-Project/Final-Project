const express = require('express');
const router = express.Router();
const admin = require('../services/admin');

// * Returns all Admins when querying with no ID
router.get('/', async function (req, res) {
    try {
        res.json(await admin.getAll());
    } catch (err) {
        console.error(`Error while getting Admins`, err.message);
        res.status(500).send(err);
    }
});

// * Returns a specific Admin when querying with an ID
router.get('/:username', async function (req, res, next) {
    try {
        res.json(await admin.getOne(req.params.username))
    } catch (err) {
        console.error(`Error while fetching Username:${req.params.username} from DB`);
        next(err);
    }
});
module.exports = router;