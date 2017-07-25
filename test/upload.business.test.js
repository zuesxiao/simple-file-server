/**
 * Created by jeff on 16/12/29.
 */

'use strict';

var fs = require('fs'),
  should = require('should'),
  path = require('path'),
  business = require(path.resolve('./app/businesses/upload.server.business'));

describe('Upload business unit tests:', function () {
  describe('Upload object unit tests:', function () {
    var objToSave;
    var baseFolder = 'public';

    beforeEach(function (done) {
      objToSave = {
        field1: 'field1',
        field2: 'field2',
        field3: {
          subField1: 'subField1',
          subField2: 'subField2'
        }
      };
      done();
    });

    it('Should return file info of the object:', function (done) {
      business.save(objToSave).then(function (result) {
        result.should.have.property('name');
        result.name.should.endWith('.json');
        result.should.have.property('size', 96);
        done();
      }, function (err) {
        done(err);
      });
    });

    it('Should save the object into objects folder:', function (done) {
      business.save(objToSave).then(function (result) {
        fs.access(path.join(baseFolder, result.name), function (err) {
          should.not.exists(err);
          done();
        });
      }, function (err) {
        done(err);
      });
    });
  });

  describe('Upload image unit tests:', function () {
    var image;
    var baseFolder = 'public';

    beforeEach(function (done) {
      fs.createReadStream('./public/sample.jpg').pipe(fs.createWriteStream('./uploads/uploaded.jpg'));
      image = {
        path: 'uploads/uploaded.jpg',
        originalname: 'uploaded.jpg',
        size: 364288
      };
      done();
    });

    it('Should return image info of the image file:', function (done) {
      business.save({folder: 'images'}, image).then(function (result) {
        result.should.have.property('name', 'images/uploaded.jpg');
        result.should.have.property('size', 364288);
        done();
      }, function (err) {
        done(err);
      });
    });

    it('Should save the image into image folder:', function (done) {
      business.save({folder: 'images'}, image).then(function (result) {
        fs.access(path.join(baseFolder, result.name), function (err) {
          should.not.exists(err);
          done();
        });
      }, function (err) {
        done(err);
      });
    });
  });

  describe('Upload file unit tests:', function () {
    var file;
    var baseFolder = 'public';

    beforeEach(function (done) {
      fs.createReadStream('./public/robots.txt').pipe(fs.createWriteStream('./uploads/uploaded.txt'));
      file = {
        path: 'uploads/uploaded.txt',
        originalname: 'uploaded.txt',
        size: 43
      };
      done();
    });

    it('Should return image info of the image file:', function (done) {
      business.save({folder: 'files'}, file).then(function (result) {
        result.should.have.property('name', 'files/uploaded.txt');
        result.should.have.property('size', 43);
        done();
      }, function (err) {
        done(err);
      });
    });

    it('Should save the image into image folder:', function (done) {
      business.save({}, file).then(function (result) {
        fs.access(path.join(baseFolder, result.name), function (err) {
          should.not.exists(err);
          done();
        });
      }, function (err) {
        done(err);
      });
    });
  });
});
