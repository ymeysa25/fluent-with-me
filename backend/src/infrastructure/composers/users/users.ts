
import { prismaClient } from '../../databases/connections'

// interface
import { IController } from '../../../domain/interfaces/controller/IController'
import { IPasswordHasher } from '../../../domain/interfaces/providers/providers'
import { IUsersRepository } from '../../../domain/interfaces/repositories/users/users'
import { ICreateUserUseCase, IDeleteUserUseCase, IGetAllUserUseCase, IUpdateUserUseCase } from '../../../domain/interfaces/usecases/users/users'

// implementation
import { CreateUserUseCase } from '../../../application/usecases/users/create_user'
import { DeleteUserUseCase } from '../../../application/usecases/users/delete_user'
import { GetAllUserUseCase } from '../../../application/usecases/users/get_users'
import { UpdateUserUseCase } from '../../../application/usecases/users/update_user'

import { CreateUserController } from '../../../infrastructure/controllers/users/create_user'
import { GetUserController } from '../../../infrastructure/controllers/users/get_user'
import { DeleteUserController } from '../../../infrastructure/controllers/users/delete_user'
import { UpdateUserController } from '../../../infrastructure/controllers/users/update_user'

import { PasswordHasher } from '../../providers/providers'
import { UserRepository } from '../../../application/repositories/users/users'

/**
 * Composer function for creating and configuring the components required for user creation.
 *
 * @function
 * @returns {IController} The configured user creation controller.
 */
export function createUserComposer(): IController {
    const repository: IUsersRepository = new UserRepository(prismaClient)
    const passwordHasher: IPasswordHasher = new PasswordHasher()
    const useCase: ICreateUserUseCase = new CreateUserUseCase(
        repository,
        passwordHasher,
    )
    const controller: IController = new CreateUserController(useCase)
    return controller
}


export function deleteUserComposer(): IController {
    const repository: IUsersRepository = new UserRepository(prismaClient)
    const useCase: IDeleteUserUseCase = new DeleteUserUseCase(repository)
    const controller: IController = new DeleteUserController(useCase)
    return controller
}


export function getUserComposer(): IController {
    const repository: IUsersRepository = new UserRepository(prismaClient)
    const useCase: IGetAllUserUseCase = new GetAllUserUseCase(repository)
    const controller: IController = new GetUserController(useCase)
    return controller
}


export function updateUserComposer(): IController {
    const repository: IUsersRepository = new UserRepository(prismaClient)
    const passwordHasher: IPasswordHasher = new PasswordHasher()
    const useCase: IUpdateUserUseCase = new UpdateUserUseCase(
        repository,
        passwordHasher,
    )
    const controller: IController = new UpdateUserController(useCase)
    return controller
}