// import mongoose from 'mongoose';

// const mistakeSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }, // Reference to User
//     question: { type: String, required: true },
//     selectedAnswer: { type: String, required: true },
//     correctAnswer: { type: String, required: true },
//     timestamp: { type: Date, default: Date.now }
// });

// mistakeSchema.index({ timestamp: 1 }, { expireAfterSeconds: 2592000 });

// const Mistake = mongoose.model('Mistake', mistakeSchema);

// export default Mistake;



import mongoose from 'mongoose';

const mistakeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  mistakes: [
    {
      question: { type: String, required: true },
      selectedAnswer: { type: String, required: true },
      correctAnswer: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

// Index to expire mistakes after 7 days (1 week)
mistakeSchema.index({ 'mistakes.timestamp': 1 }, { expireAfterSeconds: 604800 });

const Mistake = mongoose.model('Mistake', mistakeSchema);

export default Mistake;
