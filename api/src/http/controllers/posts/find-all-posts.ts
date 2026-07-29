import { makeFindAllPostsUseCase } from '@/useCases/factory/make-find-all-posts-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserRole } from '@/entities/enums/user-role'

export async function findAllPosts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerQuerySchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10),
  })

  const { page, limit } = registerQuerySchema.parse(request.query)

  const user = request.user as { role?: string } | undefined

  const findAllPostsUseCase = makeFindAllPostsUseCase()
  const posts = await findAllPostsUseCase.execute(page, limit, user?.role ?? UserRole.ALUNO)
  // map author relation to a friendlier field for the frontend
  const mapped = posts.map((p) => ({
    id: String(p.id),
    titulo: p.title,
    conteudo: p.content,
    autor: (p.author_id as any)?.name ?? 'Professor',
    resumo: p.content.slice(0, 120),
    categoria: 'Comunicados',
  }))

  return reply.status(200).send(mapped)
}
