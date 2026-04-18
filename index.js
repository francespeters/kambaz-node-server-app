import express from 'express';
import mongoose from "mongoose";

import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import cors from "cors";

import "dotenv/config";
import session from "express-session";

import db from "./kambaz/database/index.js";
import UserRoutes from "./kambaz/users/routes.js";
import CourseRoutes from "./kambaz/courses/routes.js";
import ModulesRoutes from "./kambaz/modules/routes.js";
import AssignmentsRoutes from "./kambaz/assignments/routes.js";
import EnrollmentsRoutes from "./kambaz/enrollments/routes.js";
import QuizzesRoutes from './kambaz/quizzes/routes.js';
import AttemptsRoutes from './kambaz/attempts/routes.js';



const app = express()

app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL || "http://localhost:3000",
    })

);     // make sure cors is used right after creating the app

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
  };
}
app.use(session(sessionOptions));

const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);

app.use(express.json());

UserRoutes(app);
CourseRoutes(app);
ModulesRoutes(app);
AssignmentsRoutes(app );
QuizzesRoutes(app);
AttemptsRoutes(app);
EnrollmentsRoutes(app);
Lab5(app);
Hello(app)

app.listen(process.env.PORT || 4000)
