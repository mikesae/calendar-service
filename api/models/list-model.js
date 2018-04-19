const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    summary: {
        type: String,
        required: 'Please specify the meal summary'
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String
    }
});

module.exports = mongoose.model('Meals', TaskSchema);