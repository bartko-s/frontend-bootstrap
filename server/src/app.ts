import express from 'express'
import path from 'path'

const app: express.Application = express();
const port = 8082;

app.use('/static', express.static('../browser/static'));

app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
