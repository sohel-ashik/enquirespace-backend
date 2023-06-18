const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    answer: {
        type: String,
        required: true
    },
    imageList: {
        type: [String],
        default: []
    },
    videoList: {
        type: [String],
        default: []
    },
    totalUpVotes: {
        type: Number,
        default: 0
    },
    totalDownVotes: {
        type: Number,
        default: 0
    },
    winner: {
        type: Boolean,
        enum: [true,false],
        default: false
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
    upVoterList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'People'
        }
    ],
    downVoterList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'People'
        }
    ],
    helperId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'People'
    },
    postDate: {
        type: Date,
        default: Date.now
      }

})

const Model = mongoose.model('Answer', schema);
module.exports = Model;