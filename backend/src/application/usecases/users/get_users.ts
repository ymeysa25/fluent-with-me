import { ResponseDTO } from '../../../domain/entities/response'
import { UserErrorType } from '../../../domain/enums/users/ErrorType'
import { IUsersRepository } from '../../../domain/interfaces/repositories/users/users'
import { IGetAllUserUseCase } from '../../../domain/interfaces/usecases/users/users'

/**
 * Use case for retrieving all users.
 *
 * @class
 * @implements {IGetAllUserUseCase}
 */
export class GetAllUserUseCase implements IGetAllUserUseCase {
  /**
   * Creates an instance of GetAllUserUseCase.
   *
   * @constructor
   * @param {IUsersRepository} userRepository - The repository for user data.
   */
  constructor(private userRepository: IUsersRepository) {}

  /**
   * Executes the get all users use case.
   *
   * @async
   * @param {number} page - The page number for pagination.
   * @returns {Promise<ResponseDTO>} The response data containing user information.
   */
  async execute(page: number): Promise<ResponseDTO> {
    try {
      const users = await this.userRepository.findAll(page)

      if (users.total === 0) {
        return { data: { error: UserErrorType.UserNotFound }, success: false }
      }

      return { data: users, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
