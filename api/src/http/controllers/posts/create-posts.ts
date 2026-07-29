import { makeCreatePostsUseCase } from '@/useCases/factory/make-create-posts-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import z from 'zod'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { Person } from '@/entities/person.entity'

export async function createPost(request: FastifyRequest, reply: FastifyReply) {
  const registerPostBodySchema = z.object({
    titulo: z.string(),
    conteudo: z.string(),
    image_url: z.string().optional(),
  })

  const { titulo, conteudo, image_url } = registerPostBodySchema.parse(
    request.body,
  )

  const user = request.user as { role: string }
  const userId = Number((request.user as { sub: string }).sub)
  const author = await appDataSource.getRepository(Person).findOne({ where: { user_id: userId } })
  if (!author?.id) return reply.status(400).send({ message: 'Professor sem perfil de pessoa vinculado.' })

  const createPostUseCase = makeCreatePostsUseCase()

  const post = await createPostUseCase.execute(
    {
      title: titulo,
      content: conteudo,
      image_url: image_url ?? '',
      author_id: author.id,
    },
    user.role,
  )

  return reply.status(201).send({ id: String(post.id), titulo: post.title, conteudo: post.content, autor: author.name, resumo: post.content.slice(0, 120), categoria: 'Comunicados' })
}
