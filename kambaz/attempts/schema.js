import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema({
  _id: String,
  quizId: { type: String, ref: "QuizModel" },
  userId: String,
  answers: { type: Object, default: {} }, // { questionId: answer }
  score: { type: Number, default: 0 },
  totalPoints: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
}, { collection: "attempts" });

export default attemptSchema;