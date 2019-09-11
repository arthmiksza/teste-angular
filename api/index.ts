import * as express from 'express';
import * as http from 'http';
import {router} from './api/routes/Router';
import * as bodyParser from 'body-parser'

const exp = express();
exp.use(bodyParser.json());
exp.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

exp.use('/api', router);
const server = http.createServer(exp);
const port = 3000;

server.listen(port, () => {
    console.log('Server ON!');
});
