import { UserRole } from '@/entities/enums/user-role'
import { IPosts } from '@/entities/models/posts.interface'
import { IPostsRepository } from '@/repositories/posts.repository.interface'
import { UnauthorizedError } from './errors/UnauthorizedError'

export class CreatePostsUseCase {
  constructor(private postsRepository: IPostsRepository) {}

  async execute(posts: IPosts, role: string): Promise<IPosts> {
    if (role !== UserRole.PROFESSOR) {
      throw new UnauthorizedError()
    }
    return this.postsRepository.create(posts)
  }
}
