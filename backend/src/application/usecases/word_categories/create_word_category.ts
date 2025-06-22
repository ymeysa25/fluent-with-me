import { ResponseDTO } from '../../../domain/entities/response'
import { ICreateWordCategoryDTO } from '../../../domain/entities/word_categories/dto/word_categories_dto'
import { IWordCategoriesRepository } from '../../../domain/interfaces/repositories/word_categories/word_categories'
import { ICreateWordCategoryUseCase } from '../../../domain/interfaces/usecases/word_categories/word_categories'

/**
 * Use case for creating a new word_category.
 *
 * @class
 * @implements {ICreateWordCategoryUseCase}
 */
export class CreateWordCategoryUseCase implements ICreateWordCategoryUseCase {
  /**
   * Creates an instance of CreateWordCategoryUseCase.
   *
   * @constructor
   * @param {IWordCategoriesRepository} wordCategoryRepository - The repository for word_category data.
   */
  constructor(
    private wordCategoryRepository: IWordCategoriesRepository,
  ) { }

  /**
   * Executes the create word_category use case.
   *
   * @async
   * @param {ICreateWordCategoryRequestDTO} request - The word_category creation request data.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({
    name,
  }: ICreateWordCategoryDTO): Promise<ResponseDTO> {
    try {
      const word_category = await this.wordCategoryRepository.create({
        name: name,
      })

      return { data: word_category, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
