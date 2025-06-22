import { ResponseDTO } from '../../../../domain/entities/response'
import { ICreateUserRequestDTO } from '../../../../domain/entities/users/dto/create_user_dto'
import { IUpdateUserRequestDTO } from '../../../../domain/entities/users/dto/update_user_dto'

/**
 * Interface for the use case of creating a new user.
 *
 * @interface
 */
export interface ICreateUserUseCase {
  /**
   * Executes the create user use case.
   *
   * @async
   * @param {ICreateUserRequestDTO} data - The data for creating a new user.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(data: ICreateUserRequestDTO): Promise<ResponseDTO>
}


/**
 * Interface for the use case of deleting a user.
 *
 * @interface
 */
export interface IDeleteUserUseCase {
  /**
   * Executes the delete user use case.
   *
   * @async
   * @param {string} userId - The ID of the user to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(userId: string): Promise<ResponseDTO>
}


/**
 * Interface for the use case of retrieving all users.
 *
 * @interface
 */
export interface IGetAllUserUseCase {
  /**
   * Executes the get all users use case.
   *
   * @async
   * @param {number} page - The page number for pagination.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(page: number): Promise<ResponseDTO>
}


/**
 * Interface for the use case of retrieving all users.
 *
 * @interface
 */
export interface IGetAllUserUseCase {
  /**
   * Executes the get all users use case.
   *
   * @async
   * @param {number} page - The page number for pagination.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(page: number): Promise<ResponseDTO>
}



/**
 * Interface for the use case of updating user information.
 *
 * @interface
 */
export interface IUpdateUserUseCase {
  /**
   * Executes the update user use case.
   *
   * @async
   * @param {string} userId - The ID of the user to be updated.
   * @param {IUpdateUserRequestDTO} data - The updated user information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(userId: string, data: IUpdateUserRequestDTO): Promise<ResponseDTO>
}
