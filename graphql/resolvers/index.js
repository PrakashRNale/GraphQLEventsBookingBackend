
const EventResolver = require('./event');
const UserResolver = require('./auth');
const BookingResolver = require('./booking');

const rootResolver = {
    ...EventResolver,
    ...UserResolver,
    ...BookingResolver
}

module.exports = rootResolver;