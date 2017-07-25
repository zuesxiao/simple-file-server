/**
 * Created by jeff on 16/12/23.
 */

var url = require('url'),
  path = require('path'),
  business = require(path.resolve('./app/businesses/upload.server.business'));

/**
 * Data upload controller.
 */
module.exports.upload = function (req, res) {
  return business.save(req.body, req.file).then(function (result) {
    return res.json({
      url: url.format({
        protocol: 'http',
        hostname: res.locals.host || 'localhost',
        port: process.env.PORT || 8888,
        pathname: result.name
      }),
      size: result.size
    });
  }, function (err) {
    return res.sendStatus(400);
  });
};
