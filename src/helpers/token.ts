import { jwt_secret } from "../config";
import * as jwt from "jsonwebtoken";
import { User } from "../data/entity/user.entity";

export function tokenCreate(payload: any) {
    return "Bearer " + jwt.sign({ hash: payload.hash, email: payload.email }, jwt_secret, { expiresIn: "1h", });
}

export function tokenValidate(token: string) {
    try {
        return <any>jwt.verify(token.replace("Bearer ", ""), jwt_secret);
    } catch (error) {
        return false;
    }
}