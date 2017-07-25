/**
 * Created by jeff on 16/12/23.
 */

'use strict';

var express = require('./express'),
  app = express.init();

app.listen(process.env.PORT || 8888, function () {
  console.log('Server started.');
});
