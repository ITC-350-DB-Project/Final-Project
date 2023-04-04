const express = require('express');
const router = express.Router();
const apt = require('../services/apt');
const auth = require('../services/auth');

// was router.create
// needs authentication
router.post('/', auth.isAuthenticated, async function (req, res) {
    try {
        res.json(await apt.createOne(req.body.aptNation, req.body.aptDesc, req.body.aptFirstSeen, req.body.aptName, req.session.user));
    } catch (err) {
        console.error(`Error could not create APT:`, err.message);
        res.status(500).send(err);
    }
});

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
router.get('/:id', async function (req, res){
    try {
        res.json(await apt.getOne(req.params.id));
    } catch (err) {
        console.error(`Error while fetching ID:${req.params.id} from DB`);
        res.status(500).send(err);
    }
});

// Was router.update
router.put('/:id', auth.isAuthenticated, async function (req, res) {
    try {
        res.json(await apt.updateOne(req.params.id));
    } catch (err) {
        console.error(`Error attempting to update APT ${req.id}`, err.message);
        res.status(500).send(err);
    }
});

router.delete('/:id', auth.isAuthenticated, async function (req, res) {
    try {
        res.json(await apt.deleteOne(req.params.id));
    } catch (err) {
        console.error(`Error attempting to delete APT ${req.params.id}`, err.message);
        res.status(500).send(err);
    }
})
module.exports = router;