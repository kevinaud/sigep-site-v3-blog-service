'use strict';

var aws  = require('aws-sdk'),
    uuid = require('uuid');

var dynamo = new aws.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  region: 'us-east-1'
});

module.exports.saveBlogPost = function(post) {

  var params = {
    TableName : 'blog-posts',
    Item: {
      id: uuid.v4(),
      date_posted: Date.now(),
      title: post.title,
      content: post.content
    }
  };

  let request = dynamo.put(params);

  return request.promise().then(
    function(data){
      return data;
    },
    function(error) {
      console.log(error);
      throw error;
    }
  );

};

module.exports.getAllBlogPosts = function() {

  var params = {
    TableName : 'blog-posts'
  };

  let request = dynamo.scan(params);

  return request.promise().then(
    function(data){
      return data;
    },
    function(error) {
      console.log(error);
      throw error;
    }
  );

};
