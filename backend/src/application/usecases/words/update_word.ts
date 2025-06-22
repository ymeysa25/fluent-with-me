import { ResponseDTO } from '../../../domain/entities/response'
import { IUpdateWordDTO } from '../../../domain/entities/words/dto/words_dto'
import { WordErrorType } from '../../../domain/enums/words/ErrorType'
import { IPasswordHasher } from '../../../domain/interfaces/providers/providers'
import { IWordsRepository } from '../../../domain/interfaces/repositories/words/words'
import { IUpdateWordUseCase } from '../../../domain/interfaces/usecases/words/words'
import { WordEntity } from '../../../domain/entities/words/words'

/**
 * Use case for updating word information.
 *
 * @class
 * @implements {IUpdateWordUseCase}
 */
export class UpdateWordUseCase implements IUpdateWordUseCase {
  /**
   * Creates an instance of UpdateWordUseCase.
   *
   * @constructor
   * @param {IWordsRepository} wordRepository - The repository for word data.
   */
  constructor(
    private wordRepository: IWordsRepository,
  ) { }

  /**
   * Executes the update word use case.
   *
   * @async
   * @param {string} wordId - The ID of the word to be updated.
   * @param {IUpdateWordRequestDTO} requestData - The updated word information.
   * @returns {Promise<ResponseDTO>} The response data containing the updated word information.
   */
  async execute(
    id: number,
    {
      language_id, word, image_url, audio_url, translation_id, translation_en, category_id
    }: IUpdateWordDTO,
  ): Promise<ResponseDTO> {
    try {
      const wordAlreadyExists = await this.wordRepository.findById(id)
      if (!wordAlreadyExists) {
        return {
          data: { error: WordErrorType.WordDoesNotExist },
          success: false,
        }
      }
      const wordEntity = WordEntity.update({ language_id, word, image_url, audio_url, translation_id, translation_en, category_id })
      const wordUpdated = await this.wordRepository.update(id, {
        language_id: wordEntity.language_id,
        word: wordEntity.word,
        image_url: wordEntity.image_url,
        audio_url: wordEntity.audio_url,
        translation_id: wordEntity.translation_id,
        translation_en: wordEntity.translation_en,
        category_id: wordEntity.category_id,
      })

      return { data: wordUpdated, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
