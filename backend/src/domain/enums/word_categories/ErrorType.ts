/**
 * Enum representing error types related to word_category operations.
 *
 * @enum
 */
export enum WordCategoryErrorType {
  /**
   * Error type indicating that the word_category already exists.
   */
  WordCategoryAlreadyExists = 'WordCategory already exists!',

  /**
   * Error type indicating that the word_category does not exist.
   */
  WordCategoryDoesNotExist = 'WordCategory does not exist!',

  /**
   * Error type indicating that no word_categories were found.
   */
  WordCategoryNotFound = 'WordCategories not found',
}
