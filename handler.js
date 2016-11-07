'use strict';

var addBlogPost     = require('./lib/addBlogPost');
var getAllBlogPosts = require('./lib/getAllBlogPosts');

module.exports.addBlogPost = (event, context, callback) => {

  runHandler(addBlogPost, event, callback);

};

module.exports.getAllBlogPosts = (event, context, callback) => {

 runHandler(getAllBlogPosts, event, callback);

};

function runHandler(handler, event, callback){

  handler(event).then(function (result) {

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
      },
      body: JSON.stringify({ success: true, message: result }),
    };

    callback(null, response);

  }, function (err) {

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
      },
      body: JSON.stringify({ success: false, message: err.message }),
    };

    callback(null, response);

  });

}
