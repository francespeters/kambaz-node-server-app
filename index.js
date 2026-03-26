import express from 'express';
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import cors from "cors";

import db from "./kambaz/database/index.js";
import UserRoutes from "./kambaz/users/routes.js";


const app = express()

app.use(cors());     // make sure cors is used right after creating the app
app.use(express.json());

UserRoutes(app, db);
Lab5(app);
Hello(app)
app.listen(process.env.PORT || 4000)
