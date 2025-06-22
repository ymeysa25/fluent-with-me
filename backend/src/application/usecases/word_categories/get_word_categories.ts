import { ResponseDTO } from '../../../domain/entities/response'
import { WordCategoryErrorType } from '../../../domain/enums/word_categories/ErrorType'
import { IWordCategoriesRepository } from '../../../domain/interfaces/repositories/word_categories/word_categories'
import { IGetAllWordCategoryUseCase } from '../../../domain/interfaces/usecases/word_categories/word_categories'

/**
 * Use case for retrieving all word_categories.
 *
 * @class
 * @implements {IGetAllWordCategoryUseCase}
 */
export class GetAllWordCategoryUseCase implements IGetAllWordCategoryUseCase {
  /**
   * Creates an instance of GetAllWordCategoryUseCase.
   *
   * @constructor
   * @param {IWordCategoriesRepository} wordCategoryRepository - The repository for word_category data.
   */
  constructor(private wordCategoryRepository: IWordCategoriesRepository) {}

  /**
   * Executes the get all word_categories use case.
   *
   * @async
   * @param {number} page - The page number for pagination.
   * @returns {Promise<ResponseDTO>} The response data containing word_category information.
   */
  async execute(): Promise<ResponseDTO> {
    try {
      const word_categories = await this.wordCategoryRepository.findAll()
      
      return { data: word_categories, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
