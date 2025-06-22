import { ResponseDTO } from '../../../domain/entities/response'
import { ICreateWordDTO } from '../../../domain/entities/words/dto/words_dto'
import { IWordsRepository } from '../../../domain/interfaces/repositories/words/words'
import { ICreateWordUseCase } from '../../../domain/interfaces/usecases/words/words'

/**
 * Use case for creating a new word.
 *
 * @class
 * @implements {ICreateWordUseCase}
 */
export class CreateWordUseCase implements ICreateWordUseCase {
  /**
   * Creates an instance of CreateWordUseCase.
   *
   * @constructor
   * @param {IWordsRepository} wordRepository - The repository for word data.
   */
  constructor(
    private wordRepository: IWordsRepository,
  ) { }

  /**
   * Executes the create word use case.
   *
   * @async
   * @param {ICreateWordRequestDTO} request - The word creation request data.
   * @returns {Promise<ResponseDTO>} The response data.
   */
  async execute({
    language_id,
    word,
    image_url,
    audio_url,
    translation_id,
    translation_en,
    category_id,
  }: ICreateWordDTO): Promise<ResponseDTO> {
    try {
      const wordRepo = await this.wordRepository.create({
        language_id: language_id,
        word: word,
        image_url: image_url,
        audio_url: audio_url,
        translation_id: translation_id,
        translation_en: translation_en,
        category_id: category_id,
      })

      return { data: wordRepo, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
