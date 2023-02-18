const AWS = require('aws-sdk');

const myCredentials = new AWS.SharedIniFileCredentials({ profile: 'dummy' });
AWS.config = new AWS.Config({
    credentials: myCredentials,
    region: 'ap-northeast-1',
    endpoint: 'dynamodb-local:8000',
    sslEnabled: false
});

const documentClient = new AWS.DynamoDB.DocumentClient();

const params = {
    TableName: 'users',
    KeyConditionExpression: 'user_id = :user_id and created_at >= :created_at',
    ExpressionAttributeValues: {
        ':user_id': 1,
        ':created_at': '1544752292'
    }
};
documentClient.query(params, (err, data) => {
    if (err) console.log(JSON.stringify(err, null, 2))
    else console.log(JSON.stringify(data, null, 2))
});