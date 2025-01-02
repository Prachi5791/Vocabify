import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
  option: { type: String, required: true },
});

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [optionSchema], // Array of options for the question
  answer: { type: String, required: true }, // Correct answer
  hint: { type: String, required: true }, // Hint for the question
});

const moduleSchema = new mongoose.Schema({
  moduleNumber: { type: Number, required: true },  // Use a number instead of ObjectId
  moduleName: { type: String, required: true },
  questions: [questionSchema], // Array of questions in the module
});

const levelSchema = new mongoose.Schema({
  level: { type: Number, required: true },
  fluency: { type: String, required: true },
  modules: [moduleSchema], // Array of modules for the level
});

const Level = mongoose.model('Level', levelSchema);

export default Level;


