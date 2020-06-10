const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const rootResolver = require('./graphql/resolvers/index');
const schema = require('./graphql/schema/index');

const app = express();

app.use(bodyParser.json());
// Following graphqlHttp function is a middleware function that we have to pass to normal express application
// This function will behind the scenes connect schema and rooValue (Resolvers).
// So if there is any request then this funtion will take care of handling and routing that 
// request to right resolvers according to schema
// Here query names and mutation names must match both in schema and in rootValue 
app.use('/graphql' , graphqlHttp({
    schema : schema,
    rootValue : rootResolver,
    graphiql : true
}))

mongoose.connect('mongodb+srv://prakash:prakash@cluster0-tkc4p.mongodb.net/EventGraphQL?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(result =>{
    app.listen(3000,()=>{
        console.log('Listening on http://3000');
    })    
}).catch(error =>{
    console.log(error);
})
