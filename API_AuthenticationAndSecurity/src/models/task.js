const { model } = require('mongoose');
const mongoose = require('mongoose');

const Task = mongoose.model( 'Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed:{
        type: Boolean,
        default: false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        requried:true,
        ref: 'User'

    }
});

module.exports = Task;