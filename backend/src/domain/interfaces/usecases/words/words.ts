import { ResponseDTO } from '../../../entities/response'
import { ICreateWordDTO, IGetWordsDTO, IUpdateWordDTO } from '../../../entities/words/dto/words_dto'

/**
 * Interface for the use case of creating a new word.
 *
 * @interface
 */
export interface ICreateWordUseCase {
  /**
   * Executes the create word use case.
   *
   * @async
   * @param {ICreateWordDTO} data - The data for creating a new word.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(data: ICreateWordDTO): Promise<ResponseDTO>
}


/**
 * Interface for the use case of deleting a word.
 *
 * @interface
 */
export interface IDeleteWordUseCase {
  /**
   * Executes the delete word use case.
   *
   * @async
   * @param {string} wordId - The ID of the word to be deleted.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(id: number): Promise<ResponseDTO>
}


/**
 * Interface for the use case of retrieving all words.
 *
 * @interface
 */
export interface IGetAllWordUseCase {
  /**
   * Executes the get all words use case.
   *
   * @async
   * @param {number} page - The page number for pagination.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(data: IGetWordsDTO): Promise<ResponseDTO>
}

/**
 * Interface for the use case of updating word information.
 *
 * @interface
 */
export interface IUpdateWordUseCase {
  /**
   * Executes the update word use case.
   *
   * @async
   * @param {string} wordId - The ID of the word to be updated.
   * @param {IUpdateWordDTO} data - The updated word information.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  execute(id: number, data: IUpdateWordDTO): Promise<ResponseDTO>
}
