import { tokenValidate } from "../helpers/token";
import { Request, Response, NextFunction } from "express";
import { AuthRepository } from "../data/repository/auth.repository";
import { getCustomRepository } from "typeorm";

export async function isAuth(request: Request, response: Response, next: NextFunction) {
    if (!request.headers.authorization) response.status(500).send('Unauthorized')
    const user = tokenValidate((request.headers.authorization || '').split(' ')[1])
    if (!user) response.status(500).send('Unauthorized')  
    try {
        const authRepository = getCustomRepository(AuthRepository);
        const auth_user_id = await authRepository.validate(user.email, user.hash);
        request.body.user = user
        request.body.user.user_id = auth_user_id
        next();
    } catch (e) {
        response.status(500).send('Unauthorized')
    }       
}