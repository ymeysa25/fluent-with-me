import { ResponseDTO } from '../../../domain/entities/response'
import { IUpdateLanguageDTO } from '../../../domain/entities/languages/dto/languages_dto'
import { LanguageErrorType } from '../../../domain/enums/languages/ErrorType'
import { IPasswordHasher } from '../../../domain/interfaces/providers/providers'
import { ILanguagesRepository } from '../../../domain/interfaces/repositories/languages/languages'
import { IUpdateLanguageUseCase } from '../../../domain/interfaces/usecases/languages/languages'
import { ILanguageEntity, LanguageEntity } from '../../../domain/entities/languages/languages'

/**
 * Use case for updating language information.
 *
 * @class
 * @implements {IUpdateLanguageUseCase}
 */
export class UpdateLanguageUseCase implements IUpdateLanguageUseCase {
  /**
   * Creates an instance of UpdateLanguageUseCase.
   *
   * @constructor
   * @param {ILanguagesRepository} languageRepository - The repository for language data.
   */
  constructor(
    private languageRepository: ILanguagesRepository,
  ) { }

  /**
   * Executes the update language use case.
   *
   * @async
   * @param {string} languageId - The ID of the language to be updated.
   * @param {IUpdateLanguageRequestDTO} requestData - The updated language information.
   * @returns {Promise<ResponseDTO>} The response data containing the updated language information.
   */
  async execute(
    id: number,
    { code, name, image_url }: IUpdateLanguageDTO,
  ): Promise<ResponseDTO> {
    try {
      const languageAlreadyExists = await this.languageRepository.findById(id)
      if (!languageAlreadyExists) {
        return {
          data: { error: LanguageErrorType.LanguageDoesNotExist },
          success: false,
        }
      }
      const languageEntity = LanguageEntity.update({ code, name, image_url })
      const languageUpdated = await this.languageRepository.update(id, {
        code: languageEntity.code,
        name: languageEntity.name,
        image_url: languageEntity.image_url,
      })

      return { data: languageUpdated, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
