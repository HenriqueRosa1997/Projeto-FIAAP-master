import { Person } from '@/entities/person.entity'
import { UserRole } from '@/entities/enums/user-role'
import { User } from '@/entities/user.entity'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { hash } from 'bcryptjs'
import { FastifyInstance, FastifyRequest } from 'fastify'
import { z } from 'zod'

const resources = ['alunos', 'professores'] as const

const personInputSchema = z.object({
  nome: z.string().trim().min(1),
  email: z.string().trim().email(),
  senha: z.string().min(6).optional(),
  turma: z.string().trim().optional(),
  especialidade: z.string().trim().optional(),
})

const personUpdateSchema = personInputSchema.omit({ senha: true }).partial()

function roleFor(resource: (typeof resources)[number]) {
  return resource === 'professores' ? UserRole.PROFESSOR : UserRole.ALUNO
}

function mapPerson(person: Person) {
  return {
    id: String(person.id),
    nome: person.name,
    email: person.email,
    turma: person.turma ?? '',
    especialidade: person.especialidade ?? '',
  }
}

function hasProfessorRole(request: FastifyRequest) {
  return (request.user as { role?: string }).role === UserRole.PROFESSOR
}

function generatedCpf(userId: number) {
  return `${Date.now()}${userId}`.slice(-11).padStart(11, '0')
}

export async function peopleRoutes(app: FastifyInstance) {
  for (const resource of resources) {
    const role = roleFor(resource)

    app.get(`/${resource}`, async (request, reply) => {
      if (!hasProfessorRole(request)) {
        return reply.status(403).send({ message: 'Acesso restrito a professores.' })
      }

      const people = await appDataSource.getRepository(Person).find({
        relations: ['user_id'],
        where: { user_id: { role } as never },
      })

      return people.map(mapPerson)
    })

    app.post(`/${resource}`, async (request, reply) => {
      if (!hasProfessorRole(request)) {
        return reply.status(403).send({ message: 'Acesso restrito a professores.' })
      }

      const body = personInputSchema.parse(request.body)
      const person = await appDataSource.transaction(async (manager) => {
        const user = await manager.save(User, {
          username: body.email,
          password: await hash(body.senha ?? crypto.randomUUID(), 8),
          role,
        })

        return manager.save(Person, {
          name: body.nome,
          email: body.email,
          cpf: generatedCpf(user.id!),
          birth: new Date('2000-01-01'),
          user_id: user.id,
          turma: body.turma,
          especialidade: body.especialidade,
        })
      })

      return reply.status(201).send(mapPerson(person))
    })

    app.put(`/${resource}/:id`, async (request, reply) => {
      if (!hasProfessorRole(request)) {
        return reply.status(403).send({ message: 'Acesso restrito a professores.' })
      }

      const id = z.coerce.number().parse((request.params as { id: string }).id)
      const values = personUpdateSchema.parse(request.body)
      const person = await appDataSource.transaction(async (manager) => {
        const current = await manager.findOne(Person, {
          where: { id },
          relations: ['user_id'],
        })

        const currentUser = current?.user_id as unknown as User | undefined

        if (!current || currentUser?.role !== role) {
          return undefined
        }

        if (values.email && values.email !== current.email) {
          await manager.update(User, currentUser.id!, {
            username: values.email,
          })
        }

        Object.assign(current, {
          name: values.nome ?? current.name,
          email: values.email ?? current.email,
          turma: values.turma ?? current.turma,
          especialidade: values.especialidade ?? current.especialidade,
        })

        return manager.save(Person, current)
      })

      if (!person) {
        return reply.status(404).send({ message: 'Cadastro não encontrado.' })
      }

      return mapPerson(person)
    })

    app.delete(`/${resource}/:id`, async (request, reply) => {
      if (!hasProfessorRole(request)) {
        return reply.status(403).send({ message: 'Acesso restrito a professores.' })
      }

      const id = z.coerce.number().parse((request.params as { id: string }).id)
      const repository = appDataSource.getRepository(Person)
      const person = await repository.findOne({ where: { id }, relations: ['user_id'] })

      const user = person?.user_id as unknown as User | undefined

      if (!person || user?.role !== role) {
        return reply.status(404).send({ message: 'Cadastro não encontrado.' })
      }

      await repository.remove(person)
      return reply.status(204).send()
    })
  }
}
