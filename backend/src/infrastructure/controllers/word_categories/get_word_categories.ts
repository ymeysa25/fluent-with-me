import { IGetAllWordCategoryUseCase } from '../../../domain/interfaces/usecases/word_categories/word_categories'
import { IHttpResponse } from '../../../domain/interfaces/helper/IHttpResponse'
import { IHttpSuccess } from '../../../domain/interfaces/helper/IHttpSuccess'
import { IHttpErrors } from '../../../domain/interfaces/helper/IHttpErrors'
import { HttpErrors } from '../../../http/helpers/HttpErrors'
import { HttpResponse } from '../../../http/helpers/HttpResponse'
import { HttpSuccess } from '../../../http/helpers/HttpSuccess'
import { HttpRequest } from '../../../http/helpers/HttpRequest'
import { IController } from '../../../domain/interfaces/controller/IController'


/**
 * Controller for handling requests to get all word_categories.
 */
export class GetWordCategoryController implements IController {
  /**
   * Creates an instance of GetWordCategoryController.
   * @param getAllWordCategoryUseCase The use case for getting all word_categories.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private getAllWordCategoryUseCase: IGetAllWordCategoryUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) { }

  /**
   * Handles an HTTP request to get all word_categories.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    let response

    try {
      // Execute the get all word_categories use case
      response = await this.getAllWordCategoryUseCase.execute()

      if (!response.success) {
        // Get all word_categories failed, return a 404 Not Found error
        error = this.httpErrors.error_404()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Get all word_categories succeeded, return a 200 OK response
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    } catch (error) {
      console.error("get word_category, err:", error)
      error = this.httpErrors.error_500()
      return new HttpResponse(error.statusCode, error.body)
    }
  }
}
