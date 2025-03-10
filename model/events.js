const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    date : Date,
    creator : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
})

module.exports = mongoose.model('Event' , eventSchema);