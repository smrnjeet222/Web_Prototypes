const { readFile } = require('fs').promises;
const path = require('path');
const express = require('express');
const router = express.Router();


router.get('/', async (request, response) => {
    response.send(await readFile(path.join(__dirname, '../', 'public', 'index.html'), 'utf-8'));
});

module.exports = router;