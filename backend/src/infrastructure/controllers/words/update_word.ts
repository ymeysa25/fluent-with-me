import { IUpdateWordUseCase } from '../../../domain/interfaces/usecases/words/words'
import { IHttpResponse } from '../../../domain/interfaces/helper/IHttpResponse'
import { IHttpSuccess } from '../../../domain/interfaces/helper/IHttpSuccess'
import { IHttpErrors } from '../../../domain/interfaces/helper/IHttpErrors'
import { HttpErrors } from '../../../http/helpers/HttpErrors'
import { HttpResponse } from '../../../http/helpers/HttpResponse'
import { HttpSuccess } from '../../../http/helpers/HttpSuccess'
import { HttpRequest } from '../../../http/helpers/HttpRequest'
import { IController } from '../../../domain/interfaces/controller/IController'


/**
 * Controller for handling word update requests.
 */
export class UpdateWordController implements IController {
  /**
   * Creates an instance of UpdateWordController.
   * @param updateWordUseCase The use case for updating a word.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private updateWordUseCase: IUpdateWordUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) { }

  /**
   * Handles an HTTP request to update a word.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    let response

    // Validate path and body parameters
    if (
      httpRequest.path &&
      httpRequest.body &&
      Object.keys(httpRequest.body).length > 0
    ) {
      const pathStringParams = Object.keys(httpRequest.path)
      const bodyParams = Object.keys(httpRequest.body)

      if (
        pathStringParams.includes('id') &&
        (bodyParams.includes('language_id') ||
          bodyParams.includes('word') ||
          bodyParams.includes('image_url') ||
          bodyParams.includes('audio_url') ||
          bodyParams.includes('translation') ||
          bodyParams.includes('category_id'))
      ) {
        const id = Number((httpRequest.path as { id: number }).id)
        const data = httpRequest.body as {
          language_id: number;
          word: string;
          image_url: string;
          audio_url: string;
          translation: string;
          category_id: number;
        }

        // Execute the update word use case
        response = await this.updateWordUseCase.execute(id, data)
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Update word failed, return a 400 Bad Request error
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Update word succeeded, return a 200 OK response
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}