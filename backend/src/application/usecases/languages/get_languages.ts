import { ResponseDTO } from '../../../domain/entities/response'
import { LanguageErrorType } from '../../../domain/enums/languages/ErrorType'
import { ILanguagesRepository } from '../../../domain/interfaces/repositories/languages/languages'
import { IGetAllLanguageUseCase } from '../../../domain/interfaces/usecases/languages/languages'

/**
 * Use case for retrieving all languages.
 *
 * @class
 * @implements {IGetAllLanguageUseCase}
 */
export class GetAllLanguageUseCase implements IGetAllLanguageUseCase {
  /**
   * Creates an instance of GetAllLanguageUseCase.
   *
   * @constructor
   * @param {ILanguagesRepository} languageRepository - The repository for language data.
   */
  constructor(private languageRepository: ILanguagesRepository) {}

  /**
   * Executes the get all languages use case.
   *
   * @async
   * @param {number} page - The page number for pagination.
   * @returns {Promise<ResponseDTO>} The response data containing language information.
   */
  async execute(): Promise<ResponseDTO> {
    try {
      const languages = await this.languageRepository.findAll()
      if (languages.length === 0) {
        return { data: { error: LanguageErrorType.LanguageNotFound }, success: false }
      }

      return { data: languages, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
