import AttemptsDao from "./dao.js";

export default function AttemptsRoutes(app) {
    const dao = AttemptsDao();

    app.post("/api/attempts", async (req, res) => {
        const attempt = await dao.createAttempt(req.body);
        res.json(attempt);
    });

    app.get("/api/attempts/:quizId/:userId", async (req, res) => {
        const { quizId, userId } = req.params;
        const attempts = await dao.findAttemptsForUserAndQuiz(userId, quizId);
        res.json(attempts);
    });

    app.get("/api/attempts/:quizId/:userId/latest", async (req, res) => {
        const { quizId, userId } = req.params;
        const attempt = await dao.findLatestAttempt(userId, quizId);
        res.json(attempt);
    });

    app.get("/api/attempts/:quizId/:userId/count", async (req, res) => {
        const { quizId, userId } = req.params;
        const count = await dao.countAttempts(userId, quizId);
        res.json({ count });
    });
}