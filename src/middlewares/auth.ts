import { tokenValidate } from "../helpers/token";
import { Request, Response, NextFunction } from "express";
import { AuthRepository } from "../data/repository/auth.repository";
import { getManager, getCustomRepository } from "typeorm";


// export function loggerMiddleware(request: express.Request, response: express.Response, next) {
//     console.log(`${request.method} ${request.path}`);
//     next();
// }

export async function isAuth(request: Request, response: Response, next: NextFunction) {
    if (!request.headers.authorization) response.status(500).send('Unauthorized')
    const user = tokenValidate((request.headers.authorization || '').split(' ')[1])
    if (!user) response.status(500).send('Unauthorized')  
    try {
        const authRepository = getCustomRepository(AuthRepository);
        const auth = await authRepository.validate(user.email, user.hash);
        console.log(auth)
        request.body.user = user
        next();

    } catch (e) {
        response.status(500).send('Unauthorized')
    }   
    
}

// function isAuth(req, res, next) {
//     if (!req.headers.authorization) {
//         res.status(500).send('Unauthorized');
//     }
//     else {
//         jwt.Validate(req.headers.authorization.split(' ')[1])
//             .then(session => {
//                 if (session.err) {
//                     res.status(500).send('Unauthorized');
//                 }
//                 else {
//                     req.session = session
//                     next();
//                 }
//             })
//             .catch(e => {
//                 res.status(500).send('Unauthorized');
//             })
//     }

// }