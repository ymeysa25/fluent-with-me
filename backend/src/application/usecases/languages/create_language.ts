import { ResponseDTO } from '../../../domain/entities/response'
import { ICreateLanguageDTO } from '../../../domain/entities/languages/dto/languages_dto'
import { ILanguagesRepository } from '../../../domain/interfaces/repositories/languages/languages'
import { ICreateLanguageUseCase } from '../../../domain/interfaces/usecases/languages/languages'

/**
 * Use case for creating a new language.
 *
 * @class
 * @implements {ICreateLanguageUseCase}
 */
export class CreateLanguageUseCase implements ICreateLanguageUseCase {
  /**
   * Creates an instance of CreateLanguageUseCase.
   *
   * @constructor
   * @param {ILanguagesRepository} languageRepository - The repository for language data.
   */
  constructor(
    private languageRepository: ILanguagesRepository,
  ) { }

  /**
   * Executes the create language use case.
   *
   * @async
   * @param {ICreateLanguageRequestDTO} request - The language creation request data.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({
    code,
    name,
    image_url,
  }: ICreateLanguageDTO): Promise<ResponseDTO> {
    try {
      const language = await this.languageRepository.create({
        code: code,
        name: name,
        image_url, 
      })

      return { data: language, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
