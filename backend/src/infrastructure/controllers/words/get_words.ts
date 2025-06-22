import { IGetAllWordUseCase } from '../../../domain/interfaces/usecases/words/words'
import { IHttpResponse } from '../../../domain/interfaces/helper/IHttpResponse'
import { IHttpSuccess } from '../../../domain/interfaces/helper/IHttpSuccess'
import { IHttpErrors } from '../../../domain/interfaces/helper/IHttpErrors'
import { HttpErrors } from '../../../http/helpers/HttpErrors'
import { HttpResponse } from '../../../http/helpers/HttpResponse'
import { HttpSuccess } from '../../../http/helpers/HttpSuccess'
import { HttpRequest } from '../../../http/helpers/HttpRequest'
import { IController } from '../../../domain/interfaces/controller/IController'


/**
 * Controller for handling requests to get all words.
 */
export class GetWordController implements IController {
  /**
   * Creates an instance of GetWordController.
   * @param getAllWordUseCase The use case for getting all words.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private getAllWordUseCase: IGetAllWordUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) { }

  /**
   * Handles an HTTP request to get all words.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    let response

    try {

      if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
        const bodyParams = Object.keys(httpRequest.body)

        if (
          bodyParams.includes('language_id') &&
          bodyParams.includes('category_id')
        ) {

          // Extract word creation data from the request body
          const getWordRequest = httpRequest.body as {
            language_id: number;
            category_id: number;
          }

          // Execute the get all words use case
          response = await this.getAllWordUseCase.execute(getWordRequest)

          if (!response.success) {
            // Get all words failed, return a 404 Not Found error
            error = this.httpErrors.error_404()
            return new HttpResponse(error.statusCode, response.data)
          }

        }

      }


      // Get all words succeeded, return a 200 OK response
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    } catch (error) {
      console.error("get word, err:", error)
      error = this.httpErrors.error_500()
      return new HttpResponse(error.statusCode, error.body)
    }
  }
}
