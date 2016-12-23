/**
 * Created by jeff on 16/12/23.
 */

'use strict';

var os         = require('os'),
    path       = require('path'),
    bodyParser = require('body-parser'),
    express    = require('express');

module.exports.init = function () {
    var app = express();

    app.locals.host = '';
    app.disable('x-powered-by');

    app.use('/', express.static(path.resolve('./public'), {maxAge: 1000 * 3600 * 24}));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.get('/favicon.ico', function (req, res) {
        res.sendStatus(200);
    });

    require(path.resolve('./app/routes/file.server.routes'))(app);

    app.use(function (err, req, res, next) {
        if (!err) {
            next();
        }

        res.status(500).send(JSON.stringify(err));
    });

    app.use(function (req, res, next) {
        return res.sendStatus(404);
    });

    return app;
};