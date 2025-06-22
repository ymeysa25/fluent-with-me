import { IDeleteLanguageUseCase } from '../../../domain/interfaces/usecases/languages/languages'
import { IHttpResponse } from '../../../domain/interfaces/helper/IHttpResponse'
import { IHttpSuccess } from '../../../domain/interfaces/helper/IHttpSuccess'
import { IHttpErrors } from '../../../domain/interfaces/helper/IHttpErrors'
import { HttpErrors } from '../../../http/helpers/HttpErrors'
import { HttpResponse } from '../../../http/helpers/HttpResponse'
import { HttpSuccess } from '../../../http/helpers/HttpSuccess'
import { HttpRequest } from '../../../http/helpers/HttpRequest'
import { IController } from '../../../domain/interfaces/controller/IController'

/**
 * Controller for handling requests to delete a language.
 */
export class DeleteLanguageController implements IController {
  /**
   * Creates an instance of DeleteLanguageController.
   * @param deleteLanguageUseCase The use case for deleting a language.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private deleteLanguageUseCase: IDeleteLanguageUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {}

  /**
   * Handles an HTTP request to delete a language.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error

    // Extract language ID from path parameters
    const id = Number((httpRequest.path as { id: number }).id)

    // Execute the delete language use case
    const response = await this.deleteLanguageUseCase.execute(id)

    if (!response.success) {
      // Delete language failed, return a 400 Bad Request error
      error = this.httpErrors.error_400()
      return new HttpResponse(error.statusCode, response.data)
    }

    // Delete language succeeded, return a 200 OK response
    const success = this.httpSuccess.success_200(response.data)
    return new HttpResponse(success.statusCode, success.body)
  }
}
