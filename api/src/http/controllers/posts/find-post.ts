import { makeFindPostsUseCase } from '@/useCases/factory/make-find-posts-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserRole } from '@/entities/enums/user-role'

export async function findPost(request: FastifyRequest, reply: FastifyReply) {
  const findPostParamsSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = findPostParamsSchema.parse(request.params)

  const user = request.user as { role?: string } | undefined

  const findPostUseCase = makeFindPostsUseCase()

  const post = await findPostUseCase.execute(id, user?.role ?? UserRole.ALUNO)

  // include author_name for frontend convenience
  const mapped = post ? {
    id: String(post.id),
    titulo: post.title,
    conteudo: post.content,
    autor: (post.author_id as any)?.name ?? 'Professor',
    resumo: post.content.slice(0, 120),
    categoria: 'Comunicados',
  } : post

  return reply.status(200).send(mapped)
}
