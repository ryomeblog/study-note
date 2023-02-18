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
    Key: {
        user_id: 3,
        created_at: '1544748692'
    },
    UpdateExpression: 'set message = :message, post_id=:post_id',
    ExpressionAttributeValues: {
        ':message': 'update_xxxxxxxxxxxxxxx',
        ':post_id': 100
    },
    ReturnValues: 'ALL_NEW'
}
documentClient.update(params, (err, data) => {
    if (err) console.log(JSON.stringify(err, null, 2))
    else console.log(JSON.stringify(data, null, 2))
});