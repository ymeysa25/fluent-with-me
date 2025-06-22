import { WordErrorType } from '../../../domain/enums/words/ErrorType'
import { WordSuccessType } from '../../../domain/enums/words/SuccessType'
import { IWordsRepository } from '../../../domain/interfaces/repositories/words/words'
import { IDeleteWordUseCase } from '../../../domain/interfaces/usecases/words/words'

/**
 * Use case for deleting a word.
 *
 * @class
 * @implements {IDeleteWordUseCase}
 */
export class DeleteWordUseCase implements IDeleteWordUseCase {
  /**
   * Creates an instance of DeleteWordUseCase.
   *
   * @constructor
   * @param {IWordsRepository} wordRepository - The repository for word data.
   */
  constructor(private wordRepository: IWordsRepository) {}

  /**
   * Executes the delete word use case.
   *
   * @async
   * @param {string} wordId - The ID of the word to be deleted.
   * @returns {Promise<{ data: { error?: WordErrorType | WordSuccessType }, success: boolean }>} The response data.
   */
  async execute(id: number): Promise<{
    data: { error?: WordErrorType | WordSuccessType }
    success: boolean
  }> {
    try {
      const wordAlreadyExists = await this.wordRepository.findById(id)
      if (!wordAlreadyExists) {
        return {
          data: { error: WordErrorType.WordDoesNotExist },
          success: false,
        }
      }

      await this.wordRepository.delete(id)
      return { data: { error: WordSuccessType.WordDeleted }, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
