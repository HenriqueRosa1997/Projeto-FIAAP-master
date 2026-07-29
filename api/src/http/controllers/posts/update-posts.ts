import { makeUpdatePostsUseCase } from '@/useCases/factory/make-update-posts-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function updatePosts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerParamsSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = registerParamsSchema.parse(request.params)

  const registerBodySchema = z.object({
    titulo: z.string(),
    conteudo: z.string(),
    image_url: z.string().optional(),
    author_id: z.number().optional(),
  })

  const { titulo, conteudo, image_url, author_id } = registerBodySchema.parse(
    request.body,
  )

  const user = request.user as { role: string }

  const updatePostsUseCase = makeUpdatePostsUseCase()

  const posts = await updatePostsUseCase.execute(
    {
      id,
      title: titulo,
      content: conteudo,
      image_url,
      author_id,
    },
    user.role,
  )

  return reply.status(200).send({ id: String(posts.id), titulo: posts.title, conteudo: posts.content, autor: 'Professor', resumo: posts.content.slice(0, 120), categoria: 'Comunicados' })
}
