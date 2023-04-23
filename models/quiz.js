const mongoose = require('mongoose');
const { Schema } = mongoose;

const quizSchema = new Schema({
    name: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },  
    genre: { type: String, required: true },
    categories: [{ type: String }],
    questions: [
        {
          question: { type: String, required: true },
          answers: [{ type: String, required: true }],
          correctAnswer: { type: String, required: true },
          difficulty: { type: Number, required: true },
        },
    ],
    leaderboard: [
        {
          ranking: { type: Number, require: true },
          userId: { type: Schema.Types.ObjectId, ref: 'User' },
          score: { type: Number },
          date: { type: Date, default: Date.now },
        },
    ],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

// Temporary middleware function to set author to "Zach"
quizSchema.pre("save", function(next) {
  if (!this.author) {
    this.author = "Zach"; // Placeholder author
  }
  next();
});

quizSchema.path("questions").validate(function (questions) {
  const minQuestions = 10;
  const maxQuestions = 50;
  return questions.length >= minQuestions && questions.length <= maxQuestions;
}, "The number of questions must be between 10 and 50");

quizSchema.index({ name: 1, author: 1 }, { unique: true });

quizSchema.virtual('likesPercentage').get(function () {
  const totalVotes = this.likes.length + this.dislikes.length;
  return totalVotes === 0 ? 0 : (this.likes.length / totalVotes) * 100;
});

quizSchema.set('toObject', { virtuals: true });
quizSchema.set('toJSON', { virtuals: true });

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;