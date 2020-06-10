const Event = require('../../model/events');
const User = require('../../model/user');

const singleEvent = eventId =>{
    return Event.findById(eventId).then(event =>{
        console.log('single '+event)
        return{
            ...event._doc,
            id : event.id,
            creator : user.bind(this,event.creator)
        }
    })
}

const events = eventIds =>{
    return Event.find({_id : {$in : eventIds}}).then(events =>{
        return events.map((event =>{
            return{
                ...event._doc,
                _id : event.id,
                creator : user.bind(this,event._doc.creator)
            }
        }))
    })
}

const user = userId =>{
    console.log(userId)
    return User.findById(userId).then(user =>{
        console.log(user);
        return{
            ...user._doc,
            _id : user.id,
            createdEvents : events.bind(this , user._doc.createdEvents)
        }
    }).catch(err =>{
        console.log(err);
    })
}

const transformEvents = event =>{
    console.log('transform')
    console.log(event)
    return {
        ...event._doc,
        _id : event.id.toString(),
        date : new Date(event._doc.date).toISOString(),
        creator : user.bind(this,event._doc.creator._id)
    }
}

const transformBooking = booking =>{
    console.log('booking')
    console.log(booking)
    return{
        ...booking._doc,
        _id : booking.id,
        createdAt : new Date(booking._doc.createdAt).toISOString(),
        updatedAt : new Date(booking._doc.updatedAt).toISOString(),
        event : singleEvent.bind(this, booking.event),
        user : user.bind(this,booking.user)
    }
}

// exports.singleEvent = singleEvent;
// exports.user = user;
// exports.events = events;

exports.transformBooking = transformBooking;
exports.transformEvents = transformEvents;