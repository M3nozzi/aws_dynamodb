//Create table

let AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-west-2',
    endpoint: 'http://localhost:8000'
});

let dynamodb = AWS.DynamoDB();
let params = {
    
    TableName: 'NodeJsBaseballStats',
    KeySchema: [
        { AttributeName: 'TeamID', KeyType: 'HASH' }, //Partitionkey
        { AttributeName: 'SK', KeyType: 'RANGE' }, //SortKey
    ],
    AttributeDefinitions: [
        { AttributeName: 'TeamID', AttributeType: 'S' },
        { AttributeName: 'SK', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};