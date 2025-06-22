import { ICreateWordUseCase } from '../../../domain/interfaces/usecases/words/words'
import { ResponseDTO } from '../../../domain/entities/response'
import { IHttpErrors } from '../../../domain/interfaces/helper/IHttpErrors'
import { IHttpRequest } from '../../../domain/interfaces/helper/IHttpRequest'
import { IHttpResponse } from '../../../domain/interfaces/helper/IHttpResponse'
import { IHttpSuccess } from '../../../domain/interfaces/helper/IHttpSuccess'
import { HttpErrors } from '../../../http/helpers/HttpErrors'
import { HttpResponse } from '../../../http/helpers/HttpResponse'
import { HttpSuccess } from '../../../http/helpers/HttpSuccess'
import { IController } from '../../../domain/interfaces/controller/IController'

/**
 * Controller for handling requests to create a word.
 */
export class CreateWordController implements IController {
  /**
   * Creates an instance of CreateWordController.
   * @param createWordCase The use case for creating a word.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private createWordCase: ICreateWordUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) { }

  /**
   * Handles an HTTP request to create a word.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error
    let response: ResponseDTO

    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const bodyParams = Object.keys(httpRequest.body)

      if (
        bodyParams.includes('language_id') &&
        bodyParams.includes('word') &&
        bodyParams.includes('image_url') &&
        bodyParams.includes('audio_url') &&
        bodyParams.includes('translation_id') &&
        bodyParams.includes('translation_en') &&
        bodyParams.includes('category_id')
      ) {
        // Extract word creation data from the request body
        const createWordRequestDTO = httpRequest.body as {
          language_id: number;
          word: string;
          image_url: string;
          audio_url: string;
          translation_id: string;
          translation_en: string;
          category_id: number;
        }

        // Execute the create word use case
        response = await this.createWordCase.execute(createWordRequestDTO)
      } else {
        // Invalid request body parameters, return a 422 Unprocessable Entity error
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Create word failed, return a 400 Bad Request error
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Create word succeeded, return a 201 Created response
      const success = this.httpSuccess.success_201(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request body, return a 500 Internal Server Error
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
