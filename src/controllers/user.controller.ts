import { Request, Response } from "express";
import { getManager, getCustomRepository } from "typeorm";
import { User } from "../data/entity/user.entity";
import { UserRepository } from "../data/repository/user.repository";
import { Country } from "../data/entity/country.entity";
import { responseError, responseSuccess } from "../helpers/responses";


export async function indexUser(req: Request, res: Response): Promise<Response> {
    const userRepository = getManager().getRepository(User);
    const users = await userRepository.find({ relations: ["country"] });
    return res.status(200).json(users);
}

export async function allUser(req: Request, res: Response): Promise<Response> {
    const userRepository = getCustomRepository(UserRepository);
    const users = await userRepository.all();
    return res.status(200).json(responseSuccess(users));
}

export async function addUser(req: Request, res: Response): Promise<Response> {
    try {
        const result = await getCustomRepository(UserRepository).add(new User(req.body));
        return res.status(200).json(responseSuccess(result));

    } catch (e) {      
        return res.status(400).json(responseError(e));
    }   
}
