'use strict';

var co     = require('co'),
    dynamo = require('../dynamo');

const RESPONSE = {
  DATABASE_ERROR : "There was a problem retrieving the blog posts"
};

module.exports = co.wrap(function* (event) {

  // Validate Request Format
  try {
    var posts = yield dynamo.getAllBlogPosts();
  }
  catch(err) {
    throw new Error(RESPONSE.DATABASE_ERROR);
  }

  return posts;

})
