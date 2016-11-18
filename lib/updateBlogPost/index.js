'use strict';

var co     = require('co'),
    dynamo = require('../dynamo');

const RESPONSE = {
  DATABASE_ERROR : "There was a problem retrieving the blog posts",
  NOT_FOUND: "Post not found"
};

module.exports = co.wrap(function* (event) {

  // Validate Request Format
  try {
    if (validFormat(event) === false) {
      throw new Error(RESPONSE.NOT_FOUND);
    }
  }
  catch(err) {
    console.log(err);
    throw err;
  }

  try {
    let postId = event.pathParameters.id;
    let body = JSON.parse(event.body);
    console.log('postId', postId);
    yield dynamo.updateBlogPost(postId, body);
  }
  catch(err) {
    console.log(err);
    throw new Error(RESPONSE.DATABASE_ERROR);
  }

  return "success";

});

function validFormat(event) {
  if (!event.hasOwnProperty('pathParameters')) {
    return false;
  }
  else if (!event.pathParameters.hasOwnProperty('id')) {
    return false;
  } 
  else if (!event.hasOwnProperty('body') || typeof JSON.parse(event.body) !== 'object') {
    return false
  } else {
    return true;
  }
}
