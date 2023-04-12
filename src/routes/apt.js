const express = require('express');
const router = express.Router();
const apt = require('../services/apt');
const auth = require('../services/auth');

router.post('/', auth.isAuthenticated, async function (req, res) {
    try {
        result = await apt.createOne(req.body.aptNation, req.body.aptDesc, req.body.aptFirstSeen, req.body.aptName, req.session.user, req.body);
    } catch (err) {
        console.error(`Error could not create APT:`, err.message);
        res.status(500).send(err);
    }
    if(parseInt(req.body.numSources) > 0){
        try {
            id = await apt.getIDbyName(req.body.aptName);
            id = id[0].APTID;
            console.log(id);
        } catch {
            console.error(`Error could find APT:`, err.message);
            res.status(500).send(err);
        }

        for(i=1;i < parseInt(req.body.numSources) + 1; i++){
            objName = "source" + i;
            console.log("body source #" + i + "= " + req.body[objName]);
            if(req.body[objName].length > 0){
                try {
                    insert = await apt.addSource(id, req.body[objName]);
                } catch {
                    console.error(`Error inserting source:`, err.message);
                    res.status(500).send(err);
                }
            }
        }
    }
    res.json(result);
});

router.get('/sources/:id', async function (req, res){
    try {
        res.json(await apt.getSources(req.params.id));
    } catch (err){
        console.error(`Error loading sources`, err.message);
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

router.put('/:id', auth.isAuthenticated, async function (req, res) {
    console.log(req.body);
    try {
        res.json(await apt.updateOne(req.params.id, req.body.aptNation, req.body.aptDesc, req.body.aptName, req.session.user, req.body.aptFirstSeen));
    } catch (err) {
        console.error(`Error attempting to update APT ${req.id}`, err.message);
        res.status(500).send(err);
    }

    //Clear all sources
    deleteSource = await apt.clearSources(req.params.id);

    if(parseInt(req.body.numSources) > 0){
        for(i=1;i < parseInt(req.body.numSources) + 1; i++){
            objName = "source" + i;
            console.log("body source #" + i + "= " + req.body[objName]);
            if(req.body[objName].length > 0){
                try {
                    insert = await apt.addSource(req.params.id, req.body[objName]);
                } catch {
                    console.error(`Error inserting source:`, err.message);
                    res.status(500).send(err);
                }
            }
        }
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
