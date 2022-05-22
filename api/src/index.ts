import express, { Request, Response } from "express";
import { config } from "../config";
import {
    CreateUser,
    GetRegistration,
    SetRegistration,
} from "./services/UserService";
import bp from "body-parser";
import session from "express-session";
import passport from "passport";
import { login } from "./services/AuthService";

const app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(
    session({
        secret: config.SESS_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60 * 60 * 1000 },
    })
);

import { localLogin } from "./services/Passport";

import multer from "multer";
import bodyParser from "body-parser";
import { CreateSplit, DeleteSplitByName, GetSplits } from "./services/SplitService";

passport.use(localLogin);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json({ limit: config.SIZE_LIMIT }));
app.use(bodyParser.urlencoded({ limit: config.SIZE_LIMIT, extended: false }));

app.use((req: Request, res: Response, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

const requireSignin = passport.authenticate("local", { session: false });
const requireAuth = passport.authenticate("jwt", { session: false });
const upload = multer({ dest: "uploads/" });
const port = config.APP_PORT;

app.post("/register", (req: Request, res: Response) => {
    CreateUser(req, res);
});

app.post("/login", requireSignin, login);
app.get("/split", GetSplits);
// admin section
app.post("/split", CreateSplit);
app.delete("/split", DeleteSplitByName)

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line: no-console
    console.log(`server started at http://localhost:${port}`);
});
