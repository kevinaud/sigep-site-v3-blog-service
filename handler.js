'use strict';

var addBlogPost     = require('./lib/addBlogPost');
var getAllBlogPosts = require('./lib/getAllBlogPosts');
var getBlogPost     = require('./lib/getBlogPost');
var updateBlogPost  = require('./lib/updateBlogPost');
var deleteBlogPost  = require('./lib/deleteBlogPost');

module.exports.addBlogPost = (event, context, callback) => {
  runHandler(addBlogPost, event, callback);
};

module.exports.getAllBlogPosts = (event, context, callback) => {
  runHandler(getAllBlogPosts, event, callback);
};

module.exports.getBlogPost = (event, context, callback) => {
  runHandler(getBlogPost, event, callback);
};

module.exports.updateBlogPost = (event, context, callback) => {
  runHandler(updateBlogPost, event, callback);
};

module.exports.deleteBlogPost = (event, context, callback) => {
  runHandler(deleteBlogPost, event, callback);
};

function runHandler(handler, event, callback){

  handler(event).then(function (result) {

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
      },
      body: JSON.stringify({ success: true, data: result }),
    };

    callback(null, response);

  }, function (err) {

    console.log('ERROR', err);

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
      },
      body: JSON.stringify({ success: false, data: { error: err.message } }),
    };

    callback(null, response);

  });

}
