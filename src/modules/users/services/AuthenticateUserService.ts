
import { compare } from 'bcryptjs';
import {sign} from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import User from '@modules/users/infra/typeorm/entities/Users';

interface Request {
    email: string;
    password: string;
};

//interface Response {}
@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        ) {}


    public async execute ({ email, password}: Request): Promise<{
        user: User,
        token: String,
        }>{

            //Metodo encontrar pelo Email.
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);    
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination.', 401); 
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
        
        subject: user.id,
        expiresIn,

    });

    return{
        user,
        token,
    };

}
}
export default AuthenticateUserService;