const express = require('express');
const router = express.Router();
const apt = require('../services/apt');

/* GET programming languages. */
router.get('/', async function (req, res, next) {
    try {
        res.json(await apt.getAll());
    } catch (err) {
        console.error(`Error while getting APTs`, err.message);
        next(err);
    }
});

module.exports = router;