import express from 'express'
import path from 'path'
import {engine} from 'express-handlebars'
import * as fs from "fs"
import https from 'https'

const privateKey = fs.readFileSync('../docker/cert/dockerDomain.key')
const privateCertificate = fs.readFileSync('../docker/cert/dockerDomain.crt')
const isProduction =  process.env.NODE_ENV === 'production'

const getAssetVersion = (function() {
    const createVersion = (): number => {
        return Math.floor(new Date().getTime() / 1000)
    }

    const v = createVersion();
    return (fresh: boolean): number => {
        return fresh ? createVersion() : v;
    }
})()

const app: express.Application = express();
const port = 8082;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

app.use('/static', express.static('../browser/static'));

app.get('*', (req, res) => {
    return res.render('index', {
        layout: false,
        assetVersion: getAssetVersion(!isProduction)
    });
});

const httpsServer = https.createServer({
    key: privateKey,
    cert: privateCertificate
}, app)

httpsServer.listen(port)
