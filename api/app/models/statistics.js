const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statisticsSchema = new Schema({
    websiteId: {
        type: String,
        required: true
    },
    chats: {
        type: Number,
        required: true
    },
    missedChats: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})

const Statistics = mongoose.model('Statistics', statisticsSchema);

module.exports = {
    Statistics
}