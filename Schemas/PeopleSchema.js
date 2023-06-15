const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
      },
      pass: {
        type: String,
        required: true
      },
      phone: {
        type: String,
      },
      designation: {
        type: String
      },
      totalUpVotes: {
        type: Number,
        default: 0
      },
      totalDownVotes: {
        type: Number,
        default: 0
      },
      totalCoins: {
        type: Number,
        default: 0
      },
      questionsArr: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
      }],
      answersArr: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
      }],
      joinedDate: {
        type: Date,
        default: Date.now
      }
});

const Model = mongoose.model('People', schema);

module.exports = Model;