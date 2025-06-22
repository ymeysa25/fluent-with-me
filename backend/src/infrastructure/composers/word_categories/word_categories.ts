
import { prismaClient } from '../../databases/connections'

// interface
import { IController } from '../../../domain/interfaces/controller/IController'
import { IWordCategoriesRepository } from '../../../domain/interfaces/repositories/word_categories/word_categories'
import {
    ICreateWordCategoryUseCase,
    IDeleteWordCategoryUseCase,
    IGetAllWordCategoryUseCase,
    IUpdateWordCategoryUseCase
} from '../../../domain/interfaces/usecases/word_categories/word_categories'

// implementation
import { WordCategoryRepository } from '../../../application/repositories/word_categories/word_categories'

import { CreateWordCategoryUseCase } from '../../../application/usecases/word_categories/create_word_category'
import { DeleteWordCategoryUseCase } from '../../../application/usecases/word_categories/delete_word_category'
import { GetAllWordCategoryUseCase } from '../../../application/usecases/word_categories/get_word_categories'
import { UpdateWordCategoryUseCase } from '../../../application/usecases/word_categories/update_word_category'

import { CreateWordCategoryController } from '../../controllers/word_categories/create_word_category'
import { GetWordCategoryController } from '../../controllers/word_categories/get_word_categories'
import { DeleteWordCategoryController } from '../../controllers/word_categories/delete_word_category'
import { UpdateWordCategoryController } from '../../controllers/word_categories/update_word_category'


/**
 * Composer function for creating and configuring the components required for user creation.
 *
 * @function
 * @returns {IController} The configured user creation controller.
 */
export function createWordCategoryComposer(): IController {
    const repository: IWordCategoriesRepository = new WordCategoryRepository(prismaClient)
    const useCase: ICreateWordCategoryUseCase = new CreateWordCategoryUseCase(
        repository,
    )
    const controller: IController = new CreateWordCategoryController(useCase)
    return controller
}


export function deleteWordCategoryComposer(): IController {
    const repository: IWordCategoriesRepository = new WordCategoryRepository(prismaClient)
    const useCase: IDeleteWordCategoryUseCase = new DeleteWordCategoryUseCase(repository)
    const controller: IController = new DeleteWordCategoryController(useCase)
    return controller
}


export function getWordCategoryComposer(): IController {
    const repository: IWordCategoriesRepository = new WordCategoryRepository(prismaClient)
    const useCase: IGetAllWordCategoryUseCase = new GetAllWordCategoryUseCase(repository)
    const controller: IController = new GetWordCategoryController(useCase)
    return controller
}


export function updateWordCategoryComposer(): IController {
    const repository: IWordCategoriesRepository = new WordCategoryRepository(prismaClient)
    const useCase: IUpdateWordCategoryUseCase = new UpdateWordCategoryUseCase(
        repository,
    )
    const controller: IController = new UpdateWordCategoryController(useCase)
    return controller
}