import { LanguageErrorType } from '../../../domain/enums/languages/ErrorType'
import { LanguageSuccessType } from '../../../domain/enums/languages/SuccessType'
import { ILanguagesRepository } from '../../../domain/interfaces/repositories/languages/languages'
import { IDeleteLanguageUseCase } from '../../../domain/interfaces/usecases/languages/languages'

/**
 * Use case for deleting a language.
 *
 * @class
 * @implements {IDeleteLanguageUseCase}
 */
export class DeleteLanguageUseCase implements IDeleteLanguageUseCase {
  /**
   * Creates an instance of DeleteLanguageUseCase.
   *
   * @constructor
   * @param {ILanguagesRepository} languageRepository - The repository for language data.
   */
  constructor(private languageRepository: ILanguagesRepository) {}

  /**
   * Executes the delete language use case.
   *
   * @async
   * @param {string} languageId - The ID of the language to be deleted.
   * @returns {Promise<{ data: { error?: LanguageErrorType | LanguageSuccessType }, success: boolean }>} The response data.
   */
  async execute(id: number): Promise<{
    data: { error?: LanguageErrorType | LanguageSuccessType }
    success: boolean
  }> {
    try {
      const languageAlreadyExists = await this.languageRepository.findById(id)
      if (!languageAlreadyExists) {
        return {
          data: { error: LanguageErrorType.LanguageDoesNotExist },
          success: false,
        }
      }

      await this.languageRepository.delete(id)
      return { data: { error: LanguageSuccessType.LanguageDeleted }, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
