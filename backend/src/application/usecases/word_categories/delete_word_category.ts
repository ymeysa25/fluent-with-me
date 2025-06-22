import { WordCategoryErrorType } from '../../../domain/enums/word_categories/ErrorType'
import { WordCategorySuccessType } from '../../../domain/enums/word_categories/SuccessType'
import { IWordCategoriesRepository } from '../../../domain/interfaces/repositories/word_categories/word_categories'
import { IDeleteWordCategoryUseCase } from '../../../domain/interfaces/usecases/word_categories/word_categories'

/**
 * Use case for deleting a word_category.
 *
 * @class
 * @implements {IDeleteWordCategoryUseCase}
 */
export class DeleteWordCategoryUseCase implements IDeleteWordCategoryUseCase {
  /**
   * Creates an instance of DeleteWordCategoryUseCase.
   *
   * @constructor
   * @param {IWordCategoriesRepository} wordCategoryRepository - The repository for word_category data.
   */
  constructor(private wordCategoryRepository: IWordCategoriesRepository) {}

  /**
   * Executes the delete word_category use case.
   *
   * @async
   * @param {string} word_categoryId - The ID of the word_category to be deleted.
   * @returns {Promise<{ data: { error?: WordCategoryErrorType | WordCategorySuccessType }, success: boolean }>} The response data.
   */
  async execute(id: number): Promise<{
    data: { error?: WordCategoryErrorType | WordCategorySuccessType }
    success: boolean
  }> {
    try {
      const word_categoryAlreadyExists = await this.wordCategoryRepository.findById(id)
      if (!word_categoryAlreadyExists) {
        return {
          data: { error: WordCategoryErrorType.WordCategoryDoesNotExist },
          success: false,
        }
      }

      await this.wordCategoryRepository.delete(id)
      return { data: { error: WordCategorySuccessType.WordCategoryDeleted }, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
