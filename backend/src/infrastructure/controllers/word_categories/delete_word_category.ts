import { IDeleteWordCategoryUseCase } from '../../../domain/interfaces/usecases/word_categories/word_categories'
import { IHttpResponse } from '../../../domain/interfaces/helper/IHttpResponse'
import { IHttpSuccess } from '../../../domain/interfaces/helper/IHttpSuccess'
import { IHttpErrors } from '../../../domain/interfaces/helper/IHttpErrors'
import { HttpErrors } from '../../../http/helpers/HttpErrors'
import { HttpResponse } from '../../../http/helpers/HttpResponse'
import { HttpSuccess } from '../../../http/helpers/HttpSuccess'
import { HttpRequest } from '../../../http/helpers/HttpRequest'
import { IController } from '../../../domain/interfaces/controller/IController'

/**
 * Controller for handling requests to delete a word_category.
 */
export class DeleteWordCategoryController implements IController {
  /**
   * Creates an instance of DeleteWordCategoryController.
   * @param deleteWordCategoryUseCase The use case for deleting a word_category.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private deleteWordCategoryUseCase: IDeleteWordCategoryUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {}

  /**
   * Handles an HTTP request to delete a word_category.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error

    // Extract word_category ID from path parameters
    const id = Number((httpRequest.path as { id: number }).id)

    // Execute the delete word_category use case
    const response = await this.deleteWordCategoryUseCase.execute(id)

    if (!response.success) {
      // Delete word_category failed, return a 400 Bad Request error
      error = this.httpErrors.error_400()
      return new HttpResponse(error.statusCode, response.data)
    }

    // Delete word_category succeeded, return a 200 OK response
    const success = this.httpSuccess.success_200(response.data)
    return new HttpResponse(success.statusCode, success.body)
  }
}
