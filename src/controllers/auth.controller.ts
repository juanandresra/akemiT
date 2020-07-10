import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../data/entity/user.entity";

export async function loginAuth(req: Request, res: Response): Promise<Response> {
    
    const { email, password } = req.body;
    
    const userRepository = getRepository(User);
    let user: User;

    try {
        user = await userRepository.findOneOrFail({where: {email}})
    } catch (e) {
        return res.status(400).json({ message: 'Email or Password incorrect!!'});
    }

    if (!user.checkPassword(password)) {
        return res.status(400).json({ message: 'Email or Password incorrect!!' });
    }

    return res.status(200).json(user);

}
