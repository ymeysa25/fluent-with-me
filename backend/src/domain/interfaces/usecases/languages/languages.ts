import { ResponseDTO } from '../../../../domain/entities/response'
import { ICreateLanguageDTO, IUpdateLanguageDTO } from '../../../../domain/entities/languages/dto/languages_dto'

/**
 * Interface for the use case of creating a new language.
 *
 * @interface
 */
export interface ICreateLanguageUseCase {
  /**
   * Executes the create language use case.
   *
   * @async
   * @param {ICreateLanguageDTO} data - The data for creating a new language.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(data: ICreateLanguageDTO): Promise<ResponseDTO>
}


/**
 * Interface for the use case of deleting a language.
 *
 * @interface
 */
export interface IDeleteLanguageUseCase {
  /**
   * Executes the delete language use case.
   *
   * @async
   * @param {string} languageId - The ID of the language to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(id: number): Promise<ResponseDTO>
}


/**
 * Interface for the use case of retrieving all languages.
 *
 * @interface
 */
export interface IGetAllLanguageUseCase {
  /**
   * Executes the get all languages use case.
   *
   * @async
   * @param {number} page - The page number for pagination.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(): Promise<ResponseDTO>
}


/**
 * Interface for the use case of retrieving all languages.
 *
 * @interface
 */
export interface IGetAllLanguageUseCase {
  /**
   * Executes the get all languages use case.
   *
   * @async
   * @param {number} page - The page number for pagination.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(): Promise<ResponseDTO>
}
/**
 * Interface for the use case of updating language information.
 *
 * @interface
 */
export interface IUpdateLanguageUseCase {
  /**
   * Executes the update language use case.
   *
   * @async
   * @param {string} languageId - The ID of the language to be updated.
   * @param {IUpdateLanguageDTO} data - The updated language information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(id: number, data: IUpdateLanguageDTO): Promise<ResponseDTO>
}
