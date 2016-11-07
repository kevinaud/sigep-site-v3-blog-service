'use strict';

var co = require('co');

module.exports = co.wrap(function* (subscriber) {
    
  try {
    return "success";
  }
  catch(err) {
    throw(err);
  }

})