let AWS = require('aws-sdk');

AWS.config.update({
    region: 'sa-east-1',
    endpoint: 'http://localhost:8000'
});

let tableName = 'NodeJsBaseballStats';

let dynamodb = new AWS.DynamoDB();

//Load the data

let teams = require('./teams.json');
let players = require('./players.json');
let games = require('./games.json');
const { DynamoDB } = require('aws-sdk');

putItems(teams)
    .then(() => {
        return putItems(players);
    })
    .then(() => {
        return putItems(games);
    })
    .catch((err) => {
        console.log('Insert failed', err);
    });

function putItems(items) {

    let insertedCount = 0;
    return new Promise((resolve, reject) => {
        items.forEach(item => {
            let params = {
                TableName: tableName,
                Item: item
            };

            dynamodb.putItem(params, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (++insertedCount == items.length) {
                        console.log('Successfully inserted ' + items.length + ' items.');
                        resolve();
                    }
                }
            });
        });
    });
};