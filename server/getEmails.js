'use strict';
console.log('getting emails');

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region:'us-east-1'});

exports.handler = (e, ctx, cb) => {

    console.log('event', e);
    console.log('context', ctx);
    
    const done = (err, res) => cb(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : res
    });
    
    docClient.scan({
        TableName: 'Emails',
        Limit: 100
    }, done);
};