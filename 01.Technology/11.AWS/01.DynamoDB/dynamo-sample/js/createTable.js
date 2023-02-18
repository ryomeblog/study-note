const AWS = require('aws-sdk');

const myCredentials = new AWS.SharedIniFileCredentials({ profile: 'dummy' });
AWS.config = new AWS.Config({
    credentials: myCredentials,
    region: 'ap-northeast-1',
    endpoint: 'dynamodb-local:8000',
    sslEnabled: false
});
const dynamoDB = new AWS.DynamoDB();

const params = {
    TableName: 'users',
    AttributeDefinitions: [
        { AttributeName: 'user_id', AttributeType: 'N' },
        { AttributeName: 'created_at', AttributeType: 'S' },
        { AttributeName: 'post_id', AttributeType: 'N' }
    ],
    KeySchema: [
        { AttributeName: 'user_id', KeyType: 'HASH' },
        { AttributeName: 'created_at', KeyType: 'RANGE' }
    ],
    LocalSecondaryIndexes: [
        {
            IndexName: 'post_local_index',
            Projection: {
                ProjectionType: 'ALL'
            },
            KeySchema: [
                { AttributeName: 'user_id', KeyType: 'HASH' },
                { AttributeName: 'post_id', KeyType: 'RANGE' }
            ]
        }
    ],
    GlobalSecondaryIndexes: [
        {
            IndexName: 'post_global_index',
            Projection: {
                ProjectionType: 'ALL'
            },
            KeySchema: [
                { AttributeName: 'post_id', KeyType: 'HASH' }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 10
            }
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
}

dynamoDB.createTable(params, (err, data) => {
    if (err) {
        console.error('Unable to create table. Error JSON:', JSON.stringify(err, null, 2))
    } else {
        console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2))
    }
});