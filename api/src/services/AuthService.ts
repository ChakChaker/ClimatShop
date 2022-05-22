import { User } from "./User";
import jwt from 'jsonwebtoken';
import { config } from "../../config";
function tokenForUser(username: string) {
    const timestamp = new Date().getTime();
    return jwt.sign({user : username, iat : timestamp}, config.JWT_SECRET);
}
async function login(req: any, res: any, next: any) {

    res.send({
        token: tokenForUser(req.user.username),
        username: req.user.username,
        userID: req.user.userID,
    });
}
export {login, tokenForUser}
