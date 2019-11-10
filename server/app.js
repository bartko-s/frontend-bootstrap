const express = require('express');
const path = require('path');
const app = express();
const port = 8082;

app.use('/static', express.static('../browser/static'));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
