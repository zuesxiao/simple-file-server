/**
 * Created by jeff on 16/12/29.
 */

'use strict';

// Load module dependencies
var bluebird = require('bluebird'),
    crypto   = require('crypto'),
    fs       = require('fs'),
    path     = require('path');

/**
 * Save object to file
 * @param data {Object} any data.
 */
var saveObject = function (data) {
    return new bluebird(function (resolve, reject) {
        // Stringify the json data
        var content  = JSON.stringify(data);
        // define the file extend name as obj
        var extName  = '.obj';
        // create a random file name
        var fileName = crypto.randomBytes(16).toString('base64') + extName;
        // save the object data to objects folder with random file name
        fs.writeFile(path.join('./public/objects', fileName), content, 'utf8', function (err) {
            // if error occur reject the promise
            if (err) {
                return reject(err);
            }

            // resolve the promise with the file info
            return resolve({
                name: fileName,
                size: content.length
            });
        });
    });
};

/**
 * Save file to the target folder
 * @param folder {String} the target folder
 * @param file {Object} file entity
 */
var saveFile = function (folder, file) {
    return new bluebird(function (resolve, reject) {
        //define file path and storage path
        var filePath, storePath;

        //check arg folder
        if (typeof folder !== 'string') {
            file   = folder;
            folder = 'files';
        }

        // create file path
        filePath  = path.join(folder, file.originalname);
        // create file storage path
        storePath = path.join('./public', filePath);
        // fetch the file storage folder
        folder    = path.dirname(storePath);

        // make file storage folder if not exists
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }

        // move upload file to storage file path
        fs.rename(file.path, storePath, function (err) {
            // if error occur reject the promise
            if (err) {
                return reject(err);
            }

            // remove the uploaded file
            fs.unlinkSync(file.path);
            // resolve the promise with the file info
            return resolve({
                name: filePath,
                size: file.size
            });
        });
    });
};

/**
 * save data
 * @param body {Object} Save configuration
 * @param file {Object} The file entity
 */
module.exports.save = function (body, file) {
    if (file) {
        // if contains file, save the file to the target folder
        return saveFile(body.folder, file);
    } else {
        // else save the object to objects folder
        return saveObject(body);
    }
};