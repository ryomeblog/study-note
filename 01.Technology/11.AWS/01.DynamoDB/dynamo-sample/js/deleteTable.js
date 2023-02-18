const AWS = require('aws-sdk');

const myCredentials = new AWS.SharedIniFileCredentials({ profile: 'dummy' });
AWS.config = new AWS.Config({
    credentials: myCredentials,
    region: 'ap-northeast-1',
    endpoint: 'dynamodb-local:8000',
    sslEnabled: false
});

const dynamoDB = new AWS.DynamoDB();
const params = { TableName: 'users' };
dynamoDB.deleteTable(params, (err, data) => {
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2))
    } else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2))
    }
});