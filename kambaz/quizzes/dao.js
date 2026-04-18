import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function QuizzesDao() {  

  async function createQuiz(quiz) {
    return model.create({ ...quiz, _id: uuidv4() });
  }

  async function findQuizzesForCourse(courseId) {
    return model.find({ course: courseId });
  }

  async function deleteQuiz(quizId) {
    return model.deleteOne({ _id: quizId });
  }

  async function updateQuiz(quizId, quizUpdates) {
    return model.updateOne({ _id: quizId }, { $set: quizUpdates });
  }

  async function findQuizById(quizId) {
    return model.findById(quizId);
  }

  return {
    findQuizzesForCourse,
    createQuiz,
    deleteQuiz,
    updateQuiz,
    findQuizById,
  };
}