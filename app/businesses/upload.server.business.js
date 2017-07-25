/**
 * Created by jeff on 16/12/29.
 */

var bluebird = require('bluebird'),
  crypto = require('crypto'),
  fs = require('fs'),
  path = require('path'),
  baseFolder = 'public';

/**
 * Save object to file
 * @param data {Object} any data.
 */
var saveObject = function (data) {
  return new bluebird(function (resolve, reject) {
    // define variable
    var folder = 'objects',
      storeFolder = path.join(baseFolder, folder),
      content, fileName;

    // Stringify the json data
    content = JSON.stringify(data);

    // create a random file name
    fileName = crypto.randomBytes(16).toString('hex') + '.json';

    // create folder if not exist
    if (!fs.existsSync(storeFolder)) {
      fs.mkdirSync(storeFolder);
    }

    //crate full file name
    fileName = path.join(folder, fileName);
    // save the object data to objects folder with random file name
    fs.writeFile(path.join(baseFolder, fileName), content, 'utf8', function (err) {
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
    var storeFolder, fileName;

    //check arg folder
    folder = folder || 'files';
    // create file storage path
    storeFolder = path.join(baseFolder, folder);
    // create file path
    fileName = path.join(folder, file.originalname);

    // make file storage folder if not exists
    if (!fs.existsSync(storeFolder)) {
      fs.mkdirSync(storeFolder);
    }

    // move upload file to storage file path
    fs.rename(file.path, path.join(baseFolder, fileName), function (err) {
      // if error occur reject the promise
      if (err) {
        return reject(err);
      }

      // remove the uploaded file
      //fs.unlinkSync(file.path);
      // resolve the promise with the file info
      return resolve({
        name: fileName,
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
