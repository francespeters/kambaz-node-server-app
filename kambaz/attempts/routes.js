import AttemptsDao from "./dao.js";

export default function AttemptsRoutes(app) {
  const dao = AttemptsDao();

  // submit a new attempt
  app.post("/api/attempts", async (req, res) => {
    const attempt = await dao.createAttempt(req.body);
    res.json(attempt);
  });

  // get all attempts for a user on a quiz
  app.get("/api/attempts/:quizId/:userId", async (req, res) => {
    const { quizId, userId } = req.params;
    const attempts = await dao.findAttemptsForUserAndQuiz(userId, quizId);
    res.json(attempts);
  });

  // get latest attempt
  app.get("/api/attempts/:quizId/:userId/latest", async (req, res) => {
    const { quizId, userId } = req.params;
    const attempt = await dao.findLatestAttempt(userId, quizId);
    res.json(attempt);
  });

  // count attempts
  app.get("/api/attempts/:quizId/:userId/count", async (req, res) => {
    const { quizId, userId } = req.params;
    const count = await dao.countAttempts(userId, quizId);
    res.json({ count });
  });
}