import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateUsersService from "@modules/users/services/CreateUsersService";

export default class UsersController {

    public async create(request: Request, response: Response): Promise<Response> {

        const {name, email, password} = request.body;

    const createUser = container.resolve(CreateUsersService);

    const user = await createUser.execute({
        name,
        email,
        password,
    });

    //deletar password da listagen
    const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
    };
        
    return response.json(userWithoutPassword);
    
    return response.status(400).json({ error: error.message });

    }
}