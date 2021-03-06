import Users from '../infra/typeorm/entities/Users';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
    findById(id: string): Promise<Users | undefined>;
    findByEmail(email: string): Promise<Users | undefined>;
    create(data: ICreateUserDTO): Promise<Users>;
    save(users: Users): Promise<Users>; 
}