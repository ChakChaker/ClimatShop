import { createHash } from "crypto";
import redis from "../database/redis";
import { config } from "../../config";
import bcrypt from "bcryptjs";
import { User } from "./User";
import { Request, Response } from "express";
function CreateUser(req: Request, res: Response) {
    const username: string = req.body.username;
    const password: string = req.body.password;
    const userID = UserIDFromUserName(username);
    GetUserByID(userID).then((result: any) => {
        CreatePassword(password).then(async (saltedPassword) => {
            if (result) {
                res.send("User already exists");
                return;
            }
            const newUser = { username, saltedPassword, role: "admin" } as User;
            const params: string[] = [];
            Object.keys(newUser).forEach((key) => {
                params.push(key, (newUser as any)[key]);
            });
            console.log(params)
            const created = await redis.hmset("user:" + userID, params);
            // tslint:disable-next-line: no-console
            console.log("user created");
            res.status(200).send();
        });
    });
}

function UserIDFromUserName(username: string) {
    const hash = createHash("sha1");
    hash.update(username);
    return hash.copy().digest("hex");
}
function CreatePassword(md5Password: string) {
    return bcrypt.hash(md5Password, config.PASS_SALT);
}
function GetUserByID(userID: string) {
    return redis.hgetall("user:" + userID).then((result: any) => {
        if (JSON.stringify(result) === "{}") return null;
        const { username, saltedPassword, role } = result;
        return { username, saltedPassword, role } as User;
    });
}
function SetRegistration(req: Request, res: Response) {
    redis.set("register_enabled", req.body);
}

function GetRegistration() {
    return redis.get("register_enabled");
}
function DeleteUser(userID: string) {
    redis.hdel("user:" + userID);
}
export {
    CreateUser,
    DeleteUser,
    GetUserByID,
    UserIDFromUserName,
    CreatePassword,
    SetRegistration,
    GetRegistration,
};
