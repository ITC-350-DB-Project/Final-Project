const express = require('express');
const router = express.Router();
const apt = require('../services/apt');

// * Returns all APTs when querying with no ID
router.get('/', async function (req, res) {
    try {
        res.json(await apt.getAll());
    } catch (err) {
        console.error(`Error while getting APTs`, err.message);
        res.status(500).send(err);
    }
});
// * Returns a specific APT when querying with an ID
router.get('/:id', async function (req, res, next){
    try {
        res.json(await apt.getOne(req.params.id))
    } catch (err) {
        console.error(`Error while fetching ID:${req.params.id} from DB`);
        next(err);
    }
});
module.exports = router;