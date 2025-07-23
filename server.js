const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static(__dirname));

app.get('/questions', (req, res) => {
    const data = fs.readFileSync('./data/questions.json', 'utf-8');
    const questions = JSON.parse(data);
    const selected = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
    res.json(selected);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
