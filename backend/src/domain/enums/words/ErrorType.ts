/**
 * Enum representing error types related to word operations.
 *
 * @enum
 */
export enum WordErrorType {
  /**
   * Error type indicating that the word already exists.
   */
  WordAlreadyExists = 'Word already exists!',

  /**
   * Error type indicating that the word does not exist.
   */
  WordDoesNotExist = 'Word does not exist!',

  /**
   * Error type indicating that no words were found.
   */
  WordNotFound = 'Words not found',
}
