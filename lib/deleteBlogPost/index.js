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
    if (hasIdParam(event) === false) {
      console.log('invalid request format')
      throw new Error(RESPONSE.NOT_FOUND);
    }
  }
  catch(err) {
    console.log(err);
    throw err;
  }

  try {
    let postId = event.pathParameters.id;
    yield dynamo.deleteBlogPost(postId);
  }
  catch(err) {
    console.log(err);
    throw new Error(RESPONSE.DATABASE_ERROR);
  }

  return {
    id: event.pathParameters.id
  };

});

function hasIdParam(event) {
  if (typeof event !== 'object') {
    return false;
  }
  else if (!event.hasOwnProperty('pathParameters')) {
    return false;
  }
  else if (!event.pathParameters.hasOwnProperty('id')) {
    return false;
  } else {
    return true;
  }
}
