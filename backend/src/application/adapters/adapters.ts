import { Request } from 'express'

import { IController } from '../../domain/interfaces/controller/IController'
import { IHttpRequest } from '../../domain/interfaces/helper/IHttpRequest'
import { IHttpResponse } from '../../domain/interfaces/helper/IHttpResponse'
import { HttpRequest } from '../../http/helpers/HttpRequest'

/**
 * Adapts Express request to the application's request format and calls the provided controller.
 *
 * @async
 * @param {Request} request - The Express request object.
 * @param {IController} apiRoute - The controller to handle the request.
 * @returns {Promise<IHttpResponse>} The response from the controller.
 */
export async function expressAdapter(
  request: Request,
  apiRoute: IController,
): Promise<IHttpResponse> {
  
  const httpRequest: IHttpRequest = new HttpRequest({
    header: request.headers, // fixed: should be `headers`, not `header`
    body: request.body,
    path: request.params,
    query: request.query,
    file: request.file,        // ⬅️ for single file
    files: request.files,      // ⬅️ for multiple files
  })

  const response: IHttpResponse = await apiRoute.handle(httpRequest)
  return response
}
