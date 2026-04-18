import mongoose from "mongoose";

const choiceSchema = new mongoose.Schema({
  _id: String,
  text: String,
  isCorrect: Boolean,
});

const questionSchema = new mongoose.Schema({
  _id: String,
  type: { type: String, enum: ["multiple_choice", "true_false", "fill_in_blank"] },
  title: String,
  points: Number,
  choices: [choiceSchema],
  correctAnswer: Boolean,
  correctAnswers: [String],
});

const quizSchema = new mongoose.Schema({
  _id: String,
  title: String,
  course: { type: String, ref: "CourseModel" },
  description: String,

  quizType: { type: String, default: "Graded Quiz" },
  points: { type: Number, default: 0 },
  assignmentGroup: { type: String, default: "Quizzes" },
  shuffleAnswers: { type: Boolean, default: true },
  timeLimit: { type: Number, default: 20 },
  multipleAttempts: { type: Boolean, default: false },
  howManyAttempts: { type: Number, default: 1 },
  showCorrectAnswers: { type: String, default: "" },
  accessCode: { type: String, default: "" },
  oneQuestionAtATime: { type: Boolean, default: true },
  webcamRequired: { type: Boolean, default: false },
  lockQuestionsAfterAnswering: { type: Boolean, default: false },

  dueDate: String,
  availableFrom: String,
  availableUntil: String,
  published: { type: Boolean, default: false },
  questions: [questionSchema],
}, { collection: "quizzes" });

export default quizSchema;