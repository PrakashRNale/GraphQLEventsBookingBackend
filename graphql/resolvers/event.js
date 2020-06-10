const Event = require('../../model/events');
const User = require('../../model/user');

const { transformEvents } = require('./merge');

module.exports = {
    events : () =>{
        // return events;
        return Event.find().then(events =>{
            return events.map((event) =>{
                console.log(event);
                return transformEvents(event);
            })
        }).catch(err =>{
            console.log(err);
        })
    },
    name : () =>{
        return "Prakash"
    },
    createEvent : (args , req) =>{
        if(!req.isAuth){
            throw new Error('User not authenticated')
        }
        let createdEvent;
        const event = new Event({
            title : args.eventInput.title,
            description : args.eventInput.description,
            author : args.eventInput.author,
            date : Date.now(),
            creator : "5ee07cc85c92729dc8758820"
        })

        return event.save()
        .then(result =>{
            console.log(result._doc);
            createdEvent = transformEvents(result);
            return User.findById('5ee07cc85c92729dc8758820');               
        }).then(user =>{
            user.createdEvents.push(event); // Mongoose will extract only _id here to save as a reference
            return user.save();
        }).then(result => {
            return createdEvent
        }).catch(err => console.log(err))
    }
}