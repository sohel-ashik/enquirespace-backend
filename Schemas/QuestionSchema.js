const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    coins: {
        type: Number,
        default: 0,
        required: true
    },
    type: {
        type: String,
        default: 'others'
    },
    imageList: {
        type: [String],
        default: []
    },
    videoList: {
        type: [String],
        default: []
    },
    totalAnswers: {
        type: Number,
        default: 0
    },
    totalUpVotes: {
        type: Number,
        default: 0
    },
    totalDownVotes: {
        type: Number,
        default: 0
    },
    solved: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
    winnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    views: {
        type: Number,
        default: 0
    }
    ,
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
    answerList: [
    {
        answerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
        }
    }],
    askerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'People',
        required:true
    },
    postDate: {
        type: Date,
        default: Date.now
      }

})


const Model = mongoose.model('Question', schema);

module.exports = Model;

//mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER_NAME}:${process.env.MONGODB_PASS}@cluster-es.avemicr.mongodb.net/?retryWrites=true&w=majority`)