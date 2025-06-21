import { ResponseDTO } from '../../../domain/entities/response'
import { ICreateUserRequestDTO } from '../../../domain/entities/users/dto/create_user_dto'
import { UserEntity } from '../../../domain/entities/users/users'
import { UserErrorType } from '../../../domain/enums/users/ErrorType'
import { IPasswordHasher } from '../../../domain/interfaces/providers/providers'
import { IUsersRepository } from '../../../domain/interfaces/repositories/users/users'
import { ICreateUserUseCase } from '../../../domain/interfaces/usecases/users/users'

/**
 * Use case for creating a new user.
 *
 * @class
 * @implements {ICreateUserUseCase}
 */
export class CreateUserUseCase implements ICreateUserUseCase {
  /**
   * Creates an instance of CreateUserUseCase.
   *
   * @constructor
   * @param {IUsersRepository} userRepository - The repository for user data.
   * @param {IPasswordHasher} passwordHasher - The password hasher provider.
   */
  constructor(
    private userRepository: IUsersRepository,
    private passwordHasher: IPasswordHasher,
  ) {}

  /**
   * Executes the create user use case.
   *
   * @async
   * @param {ICreateUserRequestDTO} request - The user creation request data.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({
    email,
    name,
    password,
  }: ICreateUserRequestDTO): Promise<ResponseDTO> {
    try {
      const userEntity = UserEntity.create({
        email,
        name,
        password,
      })

      const userAlreadyExists = await this.userRepository.findByEmail(
        userEntity.email.address,
      )

      if (userAlreadyExists) {
        return {
          data: { error: UserErrorType.UserAlreadyExists },
          success: false,
        }
      }

      const passwordHashed = await this.passwordHasher.hashPassword(password)
      const user = await this.userRepository.create({
        email: userEntity.email.address,
        name: userEntity.name,
        password: passwordHashed,
      })

      return { data: user, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
