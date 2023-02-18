const AWS = require('aws-sdk');

const myCredentials = new AWS.SharedIniFileCredentials({ profile: 'dummy' });
AWS.config = new AWS.Config({
    credentials: myCredentials,
    region: 'ap-northeast-1',
    endpoint: 'dynamodb-local:8000',
    sslEnabled: false
});

const documentClient = new AWS.DynamoDB.DocumentClient();

const scanAll = async () => {
  let params = {
    TableName: 'users',
  }
  let items = []

  const scan = async () => {
    console.log('execute scan')
    console.log(params)
    const result = await documentClient.scan(params).promise()
    items.push(...result.Items)

    if (result.LastEvaluatedKey) {
      params.ExclusiveStartKey = result.LastEvaluatedKey
      await scan()
    }
  }

  try {
    await scan()
    return items
  } catch (err) {
    console.error(`[Error]: ${JSON.stringify(err)}`)
    return err
  }
}

(async () => {
  const items = await scanAll();
  console.log(JSON.stringify(items, null, 2));
})()