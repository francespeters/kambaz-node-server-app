import EnrollmentsDao from "./dao.js";

function resolveUserId(req) {
  let { userId } = req.params;
  if (userId === "current") {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return null;
    }
    userId = currentUser._id;
  }
  return userId;
}

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const findEnrollmentsForUser = (req, res) => {
    const userId = resolveUserId(req);
    if (!userId) {
      res.sendStatus(401);
      return;
    }
    res.json(dao.findEnrollmentsForUser(userId));
  };

  const enrollInCourse = (req, res) => {
    const userId = resolveUserId(req);
    if (!userId) {
      res.sendStatus(401);
      return;
    }
    const courseId = req.body.course ?? req.body.courseId;
    if (!courseId) {
      res.status(400).json({ message: "course or courseId is required" });
      return;
    }
    const row = dao.enrollUserInCourse(userId, courseId);
    res.json(row);
  };

  const unenrollFromCourse = (req, res) => {
    const userId = resolveUserId(req);
    if (!userId) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    dao.unenrollUserFromCourse(userId, courseId);
    res.sendStatus(204);
  };

  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
  app.post("/api/users/:userId/enrollments", enrollInCourse);
  app.delete("/api/users/:userId/enrollments/:courseId", unenrollFromCourse);
}
