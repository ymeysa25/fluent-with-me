/**
 * Interface representing an HTTP request.
 */
export interface IHttpRequest {
  /**
   * Represents the headers of the HTTP request.
   */
  header?: unknown;

  /**
   * Represents the body of the HTTP request.
   */
  body?: unknown;

  /**
   * Represents the query parameters of the HTTP request.
   */
  query?: unknown;

  /**
   * Represents the path parameters of the HTTP request.
   */
  path?: unknown;

  form?: unknown;


  /**
   * Represents the uploaded file (e.g., from multer).
   */
  file?: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
  };

  files?: unknown
}
