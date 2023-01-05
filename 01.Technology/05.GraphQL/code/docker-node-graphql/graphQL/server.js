const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP
const { buildSchema } = require('graphql');

let schema = buildSchema(`
 type Query {
 message: String
 }
`);

let root = {
    message: () => 'Hello World!'
};

let app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
