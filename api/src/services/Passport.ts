import { serializeUser, deserializeUser, use } from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import bcrypt from "bcryptjs";
import { GetUserByID, UserIDFromUserName } from "./UserService";
import { config } from "../../config";

import passport from "passport";
import passportLocal from "passport-local";
const localOptions = { usernameField: "username" };
const LocalStrategy = passportLocal.Strategy;

const localLogin = new LocalStrategy(
    // function of username, password, done(callback)
    (username: string, password: string, done) => {
        GetUserByID(UserIDFromUserName(username)).then((user) => {
            if (user === null) return done("No such user", false);
            bcrypt.compare(password, user.saltedPassword, (err, isValid) => {
                if (err) {
                    return done(err);
                }
                if (!isValid) {
                    return done(null, false);
                }
                return done(null, user);
            });
        });
    }
);

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET,
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    return GetUserByID(UserIDFromUserName(payload.user))
        .then((foundUser) => {
            if (foundUser) {
                if (new Date().getTime() - payload.iat > config.JWT_EXPIRE)
                    return done(null, false);
                return done(null, foundUser);
            }
            return done(null, false);
        })
        .catch((err) => done(err, false));
});

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user : any, done) => {
    done(null, user);
});

passport.use(localLogin);
passport.use(jwtLogin);
export { localLogin };
