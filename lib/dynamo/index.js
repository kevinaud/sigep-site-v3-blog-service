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

module.exports.getBlogPost = function(postId) {

  var params = {
    TableName : 'blog-posts',
    Key: {
      id: postId
    }
  };

  let request = dynamo.get(params);

  return request.promise().then(
    function(data){
      return data;
    },
    function(error) {
      throw error;
    }
  );

};

module.exports.deleteBlogPost = function(postId) {

  var params = {
    TableName : 'blog-posts',
    Key: {
      id: postId
    }
  };

  let request = dynamo.delete(params);

  return request.promise().then(
    function(data){
      console.log('delete response data', data);
      return data;
    },
    function(error) {
      throw error;
    }
  );

};

module.exports.updateBlogPost = function(postId, post) {

  var attributeUpdates = {};

  var x = 0;
  console.log('TEST X' + x.toString())
  Object.keys(post).forEach(function(attribute) {
    x += 1;
    console.log('TEST X' + x)
    attributeUpdates[attribute] = {
      Action: 'PUT',
      Value: post[attribute]
    };

  });

  var params = {
    TableName : 'blog-posts',
    Key: {
      id: postId
    },
    AttributeUpdates: attributeUpdates
  };

  console.log('TEST Y')
  let request = dynamo.update(params);
  console.log('TEST Z');

  return request.promise().then(
    function(data){
      console.log('TEST A');
      return data;
    },
    function(error) {
      console.log('TEST B');
      throw error;
    }
  );

};
