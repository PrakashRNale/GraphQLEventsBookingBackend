const Booking = require('../../model/booking');
const { transformEvents , transformBooking } = require('./merge');

module.exports = {

    booking : () =>{
        return Booking.find().then(bookings =>{
            return bookings.map(booking =>{
                return transformBooking(booking);
            })
            
        }).catch(err => console.log(err))
    },

    bookEvent : (args) =>{       
            const booking = new Booking({
                event : args.eventId, // only args.eventId can also work here
                user : '5ee07cc85c92729dc8758820',
            })
            return booking.save().then(bookedEvent =>{
                console.log('booked '+bookedEvent);
                return transformBooking(bookedEvent);
            }).catch(err => console.log(err))        
    },
    cancelBooking : args =>{
        let event;
        console.log(args.bookingId)
        return Booking.findById(args.bookingId).populate('event').then(booking =>{
            console.log('booking to delete '+booking)
            event = transformEvents(booking);
            return Booking.deleteOne({_id:args.bookingId})
        }).then(retuls =>{
            console.log(event)
            return event;
        })
    }

}