/**
 * Created by jeff on 16/12/23.
 */

'use strict';

module.exports = function (app) {
    var path       = require('path'),
        multer     = require('multer'),
        upload     = multer({dest: 'uploads/'}),
        controller = require(path.resolve('./app/controllers/file.server.controller')),
        express    = require('express'),
        router     = express.Router();

    router.route('/upload')
        .put(upload.single('file'), controller.upload);

    app.use(router);
};