/**
 * Enum representing error types related to language operations.
 *
 * @enum
 */
export enum LanguageErrorType {
  /**
   * Error type indicating that the language already exists.
   */
  LanguageAlreadyExists = 'Language already exists!',

  /**
   * Error type indicating that the language does not exist.
   */
  LanguageDoesNotExist = 'Language does not exist!',

  /**
   * Error type indicating that no languages were found.
   */
  LanguageNotFound = 'Languages not found',
}
