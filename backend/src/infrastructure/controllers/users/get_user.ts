import { IGetAllUserUseCase } from '../../../domain/interfaces/usecases/users/users'
import { IHttpResponse } from '../../../domain/interfaces/helper/IHttpResponse'
import { IHttpSuccess } from '../../../domain/interfaces/helper/IHttpSuccess'
import { IHttpErrors } from '../../../domain/interfaces/helper/IHttpErrors'
import { HttpErrors } from '../../../http/helpers/HttpErrors'
import { HttpResponse } from '../../../http/helpers/HttpResponse'
import { HttpSuccess } from '../../../http/helpers/HttpSuccess'
import { HttpRequest } from '../../../http/helpers/HttpRequest'
import { IController } from '../../../domain/interfaces/controller/IController'


/**
 * Controller for handling requests to get all users.
 */
export class GetUserController implements IController {
  /**
   * Creates an instance of GetUserController.
   * @param getAllUserUseCase The use case for getting all users.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private getAllUserUseCase: IGetAllUserUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {}

  /**
   * Handles an HTTP request to get all users.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error
    let response

    // Validate query parameters
    if (httpRequest.query && Object.keys(httpRequest.query).length > 0) {
      const queryStringParams = Object.keys(httpRequest.query)

      if (queryStringParams.includes('page')) {
        const page = (httpRequest.query as { page: string }).page

        // Execute the get all users use case
        response = await this.getAllUserUseCase.execute(Number(page))
      } else {
        // Invalid parameters, return a 422 Unprocessable Entity error
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Get all users failed, return a 404 Not Found error
        error = this.httpErrors.error_404()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Get all users succeeded, return a 200 OK response
      const success = this.httpSuccess.success_200(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request, return a 500 Internal Server Error
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
