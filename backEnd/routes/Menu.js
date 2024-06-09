const express = require('express');
const router = express.Router();

const { getMenu, searchMenu, createOrUpdateMenu, searchMenuById } = require("../controller/Menu");

router.get('/search', searchMenu)
router.get('/searchbyId/:id', searchMenuById);

router.post('/', createOrUpdateMenu)
    .get('/:email', getMenu)
    .patch('/', createOrUpdateMenu);


    module.exports = router; // Correct way to export the router
