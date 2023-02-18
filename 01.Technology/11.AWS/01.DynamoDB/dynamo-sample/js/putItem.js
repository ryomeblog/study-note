const AWS = require('aws-sdk');

const myCredentials = new AWS.SharedIniFileCredentials({ profile: 'dummy' });
AWS.config = new AWS.Config({
    credentials: myCredentials,
    region: 'ap-northeast-1',
    endpoint: 'dynamodb-local:8000',
    sslEnabled: false
});

const documentClient = new AWS.DynamoDB.DocumentClient();

items = [
    { user_id: 1, post_id: 2, created_at: '1544741492', message: 'aaaaaaaaaaaaaa' },
    { user_id: 2, post_id: 9, created_at: '1544745092', message: 'bbbbbbbbbbbbbb' },
    { user_id: 3, post_id: 3, created_at: '1544748692', message: 'cccccccccccccc' },
    { user_id: 1, post_id: 5, created_at: '1544752292', message: 'dddddddddddddd' },
    { user_id: 5, post_id: 3, created_at: '1544755892', message: 'eeeeeeeeeeeeee' },
]

items.forEach(item => {
    const params = {
        TableName: 'users',
        Item: {
            'user_id': item.user_id,
            'post_id': item.post_id,
            'created_at': item.created_at,
            'message': item.message
        }
    }
    documentClient.put(params, (err, data) => {
        if (err) console.log(err)
        else console.log(data)
    })
})