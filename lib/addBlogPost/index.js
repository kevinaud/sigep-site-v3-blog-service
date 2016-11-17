'use strict';

var co     = require('co'),
    dynamo = require('../dynamo');

const RESPONSE = {
  OK : "Post successfully created",
  FORMAT_ERROR : "Incorrect data format for blog post",
  DATABASE_ERROR : "There was a problem saving the post to the database",
  UNKNOWN_ERROR : "An unexpected error occurred"
};

module.exports = co.wrap(function* (event) {

  let post = JSON.parse(event.body);

  // Validate Request Format
  try {
    validateFormat(post);
  }
  catch(err) {
    throw new Error(RESPONSE.FORMAT_ERROR);
  }

  // Save blog post to DynamoDB
  try {
    yield dynamo.saveBlogPost(post);
  }
  catch(err) {
    throw new Error(RESPONSE.DATABASE_ERROR);
  }

  return RESPONSE.OK;

})

function validateFormat(post) {
  if(typeof post !== 'object') {
    throw new Error();
  }
  if(!post.hasOwnProperty('title')) {
    throw new Error();
  }
  if(!post.hasOwnProperty('content')) {
    throw new Error();
  }
}
