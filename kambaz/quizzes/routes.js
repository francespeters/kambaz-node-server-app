import QuizzesDao from "./dao.js";

export default function QuizzesRoutes(app,) {
  const dao = QuizzesDao();

  const findQuizzesForCourse = async(req, res) => {
    const { courseId } = req.params;
    const quizzes = await dao.findQuizzesForCourse(courseId);
    res.json(quizzes);
  }

  const createQuizForCourse = async (req, res) => {
    const { courseId } = req.params;
    const quiz = {
      ...req.body,
      course: courseId,
    };
    const newQuiz = await dao.createQuiz(quiz);
    res.json(newQuiz);
  }

    const deleteQuiz = async (req, res) => {
        const { quizId } = req.params;
        await dao.deleteQuiz(quizId);
        res.sendStatus(204);
    }

    const updateQuiz = async (req, res) => {
      const { quizId } = req.params;
      await dao.updateQuiz(quizId, req.body);
      res.json({ quizId, ...req.body }); 
    };
    
      app.get("/api/quizzes/:quizId", async (req, res) => {
    const quiz = await dao.findQuizById(req.params.quizId);
    res.json(quiz);
  });


  app.post("/api/courses/:courseId/quizzes", createQuizForCourse);
  app.put("/api/quizzes/:quizId", updateQuiz);

  app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
  app.delete("/api/quizzes/:quizId", deleteQuiz);
}
