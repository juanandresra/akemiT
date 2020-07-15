import { Request, Response } from "express";
import { getRepository, getCustomRepository } from "typeorm";
import { User } from "../data/entity/user.entity";

import { AuthRepository } from "../data/repository/auth.repository";
import { responseSuccess, responseError } from "../helpers/responses";

import * as jwt from "jsonwebtoken";
import { jwt_secret } from "../config";
import { tokenCreate, tokenValidate } from "../helpers/token";

export async function loginAuth(req: Request, res: Response): Promise<Response> {
    
    const { email, password } = req.body;

    try {

        const auth = await getCustomRepository(AuthRepository).login(email, password);        
        
        const payload = {
            firstName: auth.firstName,
            lastName: auth.lastName,
            email: auth.email,
            token: tokenCreate({ hash: auth.hash, email: auth.email })
        }    

        return res.status(200).json(responseSuccess(payload));

    } catch (e) {

        return res.status(400).json(responseError(e));

    }   
    
}

export async function validateAuth(req: Request, res: Response): Promise<Response> {
    
    const { token } = req.body;

    console.log("*******************************")
    console.log(req.body.user)
    console.log("*******************************")

    try {

        return res.status(200).json(responseSuccess(tokenValidate(token)));

    } catch (e) {

        return res.status(400).json(responseError(e));

    }   

}
