'use strict';

var co = require('co');

module.exports = co.wrap(function* (post) {
    
  try {
    return "success";
  }
  catch(err) {
    throw(err);
  }

})