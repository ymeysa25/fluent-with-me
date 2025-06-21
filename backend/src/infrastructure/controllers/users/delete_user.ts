import { IDeleteUserUseCase } from '../../../domain/interfaces/usecases/users/users'
import { IHttpResponse } from '../../../domain/interfaces/helper/IHttpResponse'
import { IHttpSuccess } from '../../../domain/interfaces/helper/IHttpSuccess'
import { IHttpErrors } from '../../../domain/interfaces/helper/IHttpErrors'
import { HttpErrors } from '../../../http/helpers/HttpErrors'
import { HttpResponse } from '../../../http/helpers/HttpResponse'
import { HttpSuccess } from '../../../http/helpers/HttpSuccess'
import { HttpRequest } from '../../../http/helpers/HttpRequest'
import { IController } from '../../../domain/interfaces/controller/IController'

/**
 * Controller for handling requests to delete a user.
 */
export class DeleteUserController implements IController {
  /**
   * Creates an instance of DeleteUserController.
   * @param deleteUserUseCase The use case for deleting a user.
   * @param httpErrors HTTP errors utility.
   * @param httpSuccess HTTP success utility.
   */
  constructor(
    private deleteUserUseCase: IDeleteUserUseCase,
    private httpErrors: IHttpErrors = new HttpErrors(),
    private httpSuccess: IHttpSuccess = new HttpSuccess(),
  ) {}

  /**
   * Handles an HTTP request to delete a user.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: HttpRequest): Promise<IHttpResponse> {
    let error

    // Extract user ID from path parameters
    const id = (httpRequest.path as { id: string }).id

    // Execute the delete user use case
    const response = await this.deleteUserUseCase.execute(id)

    if (!response.success) {
      // Delete user failed, return a 400 Bad Request error
      error = this.httpErrors.error_400()
      return new HttpResponse(error.statusCode, response.data)
    }

    // Delete user succeeded, return a 200 OK response
    const success = this.httpSuccess.success_200(response.data)
    return new HttpResponse(success.statusCode, success.body)
  }
}
