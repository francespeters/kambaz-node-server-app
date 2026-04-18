import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function AttemptsDao() {
  async function createAttempt(attempt) {
    return model.create({ ...attempt, _id: uuidv4() });
  }

  // get all attempts for a student on a specific quiz
  async function findAttemptsForUserAndQuiz(userId, quizId) {
    return model.find({ userId, quizId }).sort({ date: -1 });
  }

  // get just the latest attempt
  async function findLatestAttempt(userId, quizId) {
    return model.findOne({ userId, quizId }).sort({ date: -1 });
  }

  async function countAttempts(userId, quizId) {
    return model.countDocuments({ userId, quizId });
  }

  return {
    createAttempt,
    findAttemptsForUserAndQuiz,
    findLatestAttempt,
    countAttempts,
  };
}