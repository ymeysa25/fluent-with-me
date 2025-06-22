import { ResponseDTO } from '../../../domain/entities/response'
import { IUpdateWordCategoryDTO } from '../../../domain/entities/word_categories/dto/word_categories_dto'
import { WordCategoryErrorType } from '../../../domain/enums/word_categories/ErrorType'
import { IWordCategoriesRepository } from '../../../domain/interfaces/repositories/word_categories/word_categories'
import { IUpdateWordCategoryUseCase } from '../../../domain/interfaces/usecases/word_categories/word_categories'
import { WordCategoryEntity } from '../../../domain/entities/word_categories/word_categories'

/**
 * Use case for updating word_category information.
 *
 * @class
 * @implements {IUpdateWordCategoryUseCase}
 */
export class UpdateWordCategoryUseCase implements IUpdateWordCategoryUseCase {
  /**
   * Creates an instance of UpdateWordCategoryUseCase.
   *
   * @constructor
   * @param {IWordCategoriesRepository} word_categoryRepository - The repository for word_category data.
   */
  constructor(
    private word_categoryRepository: IWordCategoriesRepository,
  ) { }

  /**
   * Executes the update word_category use case.
   *
   * @async
   * @param {string} word_categoryId - The ID of the word_category to be updated.
   * @param {IUpdateWordCategoryRequestDTO} requestData - The updated word_category information.
   * @returns {Promise<ResponseDTO>} The response data containing the updated word_category information.
   */
  async execute(
    id: number,
    {  name }: IUpdateWordCategoryDTO,
  ): Promise<ResponseDTO> {
    try {
      const word_categoryAlreadyExists = await this.word_categoryRepository.findById(id)
      if (!word_categoryAlreadyExists) {
        return {
          data: { error: WordCategoryErrorType.WordCategoryDoesNotExist },
          success: false,
        }
      }
      const word_categoryEntity = WordCategoryEntity.update({ name })
      const word_categoryUpdated = await this.word_categoryRepository.update(id, {
        name: word_categoryEntity.name,
      })

      return { data: word_categoryUpdated, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
