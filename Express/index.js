const { readFile } = require('fs').promises;
const express = require('express');
const { request, response } = require('express');

const app = express();

app.get('/', async (request, response) => {

    response.send(await readFile('./Express/home.html', 'utf-8'));

});

app.listen(process.env.PORT || 5050, () => console.log(`App available on http://localhost:5050`));