/**
 * Created by jeff on 16/12/23.
 */

'use strict';

var fs   = require('fs'),
    url  = require('url'),
    path = require('path');

module.exports.upload = function (req, res) {
    var filePath, realPath, folder, extname;

    if (!req.body || !req.file) {
        return res.sendStatus(400);
    }

    filePath = req.body.path || 'objects';
    extname  = path.extname(req.file.originalname);
    if (path.extname(filePath) === '') {
        filePath = filePath + extname;
    }
    realPath = path.join('./public', filePath);
    folder   = path.dirname(realPath);

    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }

    fs.rename(req.file.path, realPath, function () {
        fs.unlinkSync(req.file.path);
        return res.json({
            url : url.format({
                protocol: 'http',
                hostname: res.locals.host || 'localhost',
                port    : 8888,
                pathname: filePath
            }),
            size: req.file.size
        });
    });
};