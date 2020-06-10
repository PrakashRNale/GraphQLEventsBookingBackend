const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Booking{
    _id : ID!
    user : User!
    event : Event!
    createdAt : String!
    updatedAt : String!
}

type Event{
    _id : ID!
    title : String!
    description : String!
    author : String!
    date : String!
    creator : User
}

input EventInput{
    title : String!
    description : String!
    author : String!
}

type User{
    _id : ID!
    email : String!
    password : String
    name : String!
    createdEvents : [Event!]
}

input UserInput{
    email : String!
    password : String!
    name : String!
}

type RootQuery{
    events : [Event!]!
    name : String!
    booking : [Booking!]
}

type RootMutation{
    createEvent(eventInput : EventInput) : Event!
    createUser(userInput : UserInput) : User!
    bookEvent(eventId : ID!) : Booking!
    cancelBooking(bookingId : ID!) : Event! 
}
schema{
    query : RootQuery
    mutation : RootMutation
}
`)
