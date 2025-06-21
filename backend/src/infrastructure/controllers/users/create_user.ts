import { ICreateUserUseCase } from '../../../domain/interfaces/usecases/users/users'
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
 * Controller for handling requests to create a user.
 */
export class CreateUserController implements IController {
  /**
   * Creates an instance of CreateUserController.
   * @param createUserCase The use case for creating a user.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private createUserCase: ICreateUserUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {}

  /**
   * Handles an HTTP request to create a user.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    let error
    let response: ResponseDTO

    if (httpRequest.body && Object.keys(httpRequest.body).length > 0) {
      const bodyParams = Object.keys(httpRequest.body)

      if (
        bodyParams.includes('name') &&
        bodyParams.includes('email') &&
        bodyParams.includes('password')
      ) {
        // Extract user creation data from the request body
        const createUserRequestDTO = httpRequest.body as {
          name: string
          email: string
          password: string
        }

        // Execute the create user use case
        response = await this.createUserCase.execute(createUserRequestDTO)
      } else {
        // Invalid request body parameters, return a 422 Unprocessable Entity error
        error = this.httpErrors.error_422()
        return new HttpResponse(error.statusCode, error.body)
      }

      if (!response.success) {
        // Create user failed, return a 400 Bad Request error
        error = this.httpErrors.error_400()
        return new HttpResponse(error.statusCode, response.data)
      }

      // Create user succeeded, return a 201 Created response
      const success = this.httpSuccess.success_201(response.data)
      return new HttpResponse(success.statusCode, success.body)
    }

    // Invalid request body, return a 500 Internal Server Error
    error = this.httpErrors.error_500()
    return new HttpResponse(error.statusCode, error.body)
  }
}
