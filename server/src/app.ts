import express from 'express'
import path from 'path'
import {createProxyMiddleware} from 'http-proxy-middleware';

const isProduction =  process.env.NODE_ENV === 'production'

const app: express.Application = express();
const port = 8082;

if(isProduction) {
    app.use('/static', express.static('../browser/static'));
} else {
    app.use('/static', createProxyMiddleware({
        target: 'http://node-browser:8080',
    }));
}

app.get('*', (req, res) => {
    return res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
