import { ResponseDTO } from '../../../entities/response'
import { ICreateWordCategoryDTO, IUpdateWordCategoryDTO } from '../../../entities/word_categories/dto/word_categories_dto'

/**
 * Interface for the use case of creating a new word_category.
 *
 * @interface
 */
export interface ICreateWordCategoryUseCase {
  /**
   * Executes the create word_category use case.
   *
   * @async
   * @param {ICreateWordCategoryDTO} data - The data for creating a new word_category.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(data: ICreateWordCategoryDTO): Promise<ResponseDTO>
}


/**
 * Interface for the use case of deleting a word_category.
 *
 * @interface
 */
export interface IDeleteWordCategoryUseCase {
  /**
   * Executes the delete word_category use case.
   *
   * @async
   * @param {string} word_categoryId - The ID of the word_category to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(id: number): Promise<ResponseDTO>
}


/**
 * Interface for the use case of retrieving all word_categorys.
 *
 * @interface
 */
export interface IGetAllWordCategoryUseCase {
  /**
   * Executes the get all word_categorys use case.
   *
   * @async
   * @param {number} page - The page number for pagination.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(): Promise<ResponseDTO>
}


/**
 * Interface for the use case of retrieving all word_categorys.
 *
 * @interface
 */
export interface IGetAllWordCategoryUseCase {
  /**
   * Executes the get all word_categorys use case.
   *
   * @async
   * @param {number} page - The page number for pagination.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(): Promise<ResponseDTO>
}
/**
 * Interface for the use case of updating word_category information.
 *
 * @interface
 */
export interface IUpdateWordCategoryUseCase {
  /**
   * Executes the update word_category use case.
   *
   * @async
   * @param {string} word_categoryId - The ID of the word_category to be updated.
   * @param {IUpdateWordCategoryDTO} data - The updated word_category information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(id: number, data: IUpdateWordCategoryDTO): Promise<ResponseDTO>
}
