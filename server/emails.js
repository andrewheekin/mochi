'use strict';
console.log('collecting emails');

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region:'us-east-1', convertEmptyValues: true});

exports.handler = (e, ctx, cb) => {

    console.log('event', e);
    console.log('context', ctx);
    
    const done = (err, res) => cb(null, {
        statusCode: err ? '400' : '200',
        body: err ? err.message : res
    });
    
    docClient.put({
        Item: {
            date: Date.now(),
            name: e.body.name,
            email: e.body.email,
            restaurant: e.body.restaurant,
            phone: e.body.phone,
            howHelp: e.body.howHelp
        },
        TableName: 'Emails'
    }, done); 
};