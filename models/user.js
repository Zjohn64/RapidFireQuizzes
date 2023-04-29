const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  scores: [
    {
      quizId: { type: Schema.Types.ObjectId, ref: 'Quiz' },
      score: { type: Number },
      date: { type: Date, default: Date.now },
    },
  ],
  medals: {
    silver: { type: Number, default: 0 },
    gold: { type: Number, default: 0 },
    platinum: { type: Number, default: 0 },
  },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  authoredQuizzes: [{ type:Schema.Types.ObjectId, ref: 'Quiz'}],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },   
});

const User = mongoose.model('User', userSchema);

module.exports = User