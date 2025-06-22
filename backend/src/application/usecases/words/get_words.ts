import { ResponseDTO } from '../../../domain/entities/response'
import { IGetWordsDTO } from '../../../domain/entities/words/dto/words_dto'
import { WordErrorType } from '../../../domain/enums/words/ErrorType'
import { IWordsRepository } from '../../../domain/interfaces/repositories/words/words'
import { IGetAllWordUseCase } from '../../../domain/interfaces/usecases/words/words'

/**
 * Use case for retrieving all words.
 *
 * @class
 * @implements {IGetAllWordUseCase}
 */
export class GetAllWordUseCase implements IGetAllWordUseCase {
  /**
   * Creates an instance of GetAllWordUseCase.
   *
   * @constructor
   * @param {IWordsRepository} wordRepository - The repository for word data.
   */
  constructor(private wordRepository: IWordsRepository) {}

  /**
   * Executes the get all words use case.
   *
   * @async
   * @param {number} page - The page number for pagination.
   * @returns {Promise<ResponseDTO>} The response data containing word information.
   */
  async execute(data: IGetWordsDTO): Promise<ResponseDTO> {
    try {
      const words = await this.wordRepository.findAll(data)
      if (words.length === 0) {
        return { data: { error: WordErrorType.WordNotFound }, success: false }
      }

      return { data: words, success: true }
    } catch (error: any) {
      return { data: { error: error.message }, success: false }
    }
  }
}
