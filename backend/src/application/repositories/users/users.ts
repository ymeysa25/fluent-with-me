import { PrismaClient } from '@prisma/client'

import { IUsersRepository } from '../../../domain/interfaces/repositories/users/users'
import { PaginationDTO } from '../../../domain/entities/pagination'
import { ICreateUserRequestDTO } from '../../../domain/entities/users/dto/create_user_dto'
import { IUpdateUserRequestDTO } from '../../../domain/entities/users/dto/update_user_dto'
import { IUserInRequestDTO } from '../../../domain/entities/users/dto/user_in_dto'
import { IUserOutRequestDTO } from '../../../domain/entities/users/dto/user_out_dto'

/**
 * Prisma implementation of the user repository.
 *
 * @class
 * @implements {IUsersRepository}
 */
export class UserRepository implements IUsersRepository {
  /**
   * Creates an instance of UserRepository.
   *
   * @constructor
   * @param {PrismaClient} prisma - The Prisma client instance.
   */
  constructor(private prisma: PrismaClient) {}

  /**
   * Creates a new user.
   *
   * @async
   * @param {ICreateUserRequestDTO} data - The user data.
   * @returns {Promise<IUserOutRequestDTO>} The created user.
   */
  async create({
    email,
    name,
    password,
  }: ICreateUserRequestDTO): Promise<IUserOutRequestDTO> {
    const user = await this.prisma.users.create({
      data: {
        email,
        name,
        password,
      },
      select: {
        id: true,
        email: true,
        name: true,
        created_at: true,
      },
    })

    return user
  }

  /**
   * Finds a user by email.
   *
   * @async
   * @param {string} email - The email to search for.
   * @returns {Promise<IUserInRequestDTO | unknown>} The found user or undefined.
   */
  async findByEmail(email: string): Promise<IUserInRequestDTO | unknown> {
    const user = await this.prisma.users.findFirst({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        created_at: true,
      },
    })

    return user
  }

  /**
   * Finds a user by ID.
   *
   * @async
   * @param {string} id - The ID of the user to find.
   * @returns {Promise<IUserInRequestDTO | null>} The found user or null.
   */
  async findById(id: string): Promise<IUserInRequestDTO | null> {
    const user = await this.prisma.users.findFirst({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        created_at: true,
      },
    })

    return user
  }

  /**
   * Retrieves a paginated list of users.
   *
   * @async
   * @param {number} pageNumber - The page number to retrieve.
   * @returns {Promise<PaginationDTO>} The paginated list of users.
   */
  async findAll(pageNumber: number): Promise<PaginationDTO> {
    const perPage = 4
    const users: IUserOutRequestDTO[] = await this.prisma.users.findMany({
      take: perPage,
      skip: Math.ceil((pageNumber - 1) * perPage),
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        email: true,
        name: true,
        created_at: true,
      },
    })

    const total = await this.prisma.users.count()

    return {
      body: users,
      total,
      page: pageNumber,
      last_page: Math.ceil(total / perPage),
    }
  }

  /**
   * Updates a user with new data.
   *
   * @async
   * @param {IUserOutRequestDTO} user - The user to update.
   * @param {IUpdateUserRequestDTO} data - The updated user data.
   * @returns {Promise<IUserOutRequestDTO>} The updated user.
   */
  async update(
    user: IUserOutRequestDTO,
    { email, name, password }: IUpdateUserRequestDTO,
  ): Promise<IUserOutRequestDTO> {
    const userUpdated = await this.prisma.users.update({
      where: {
        id: user.id,
      },
      data: {
        email,
        name,
        password,
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: false,
        created_at: true,
      },
    })

    return userUpdated
  }

  /**
   * Deletes a user by ID.
   *
   * @async
   * @param {string} id - The ID of the user to delete.
   * @returns {Promise<void>} A Promise that resolves once the user is deleted.
   */
  async delete(id: string): Promise<void> {
    await this.prisma.users.delete({
      where: {
        id,
      },
    })
  }
}
