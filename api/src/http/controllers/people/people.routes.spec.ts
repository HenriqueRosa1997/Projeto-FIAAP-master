import { hash } from 'bcryptjs'
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

const database = vi.hoisted(() => ({
  users: [] as Array<Record<string, unknown>>,
  people: [] as Array<Record<string, unknown>>,
}))

vi.mock('@/lib/typeorm/typeorm', () => {
  const userRepository = {
    findOne: async ({ where }: { where: { username?: string } }) =>
      database.users.find((user) => user.username === where.username) ?? null,
  }
  const personRepository = {
    find: async () => database.people,
    findOne: async ({ where }: { where: { id: number } }) =>
      database.people.find((person) => person.id === where.id) ?? null,
    remove: async () => undefined,
  }

  const manager = {
    save: async (entity: { name: string }, values: Record<string, unknown>) => {
      if (entity.name === 'User') {
        if (database.users.some((user) => user.username === values.username)) {
          throw Object.assign(new Error('duplicate key'), { code: '23505' })
        }

        const user = { id: database.users.length + 1, ...values }
        database.users.push(user)
        return user
      }

      const user = database.users.find((item) => item.id === values.user_id)
      const person = { id: database.people.length + 1, ...values, user_id: user }
      database.people.push(person)
      return person
    },
    findOne: async (_: unknown, { where }: { where: { id: number } }) =>
      database.people.find((person) => person.id === where.id) ?? null,
    update: async (_: unknown, id: number, values: Record<string, unknown>) => {
      Object.assign(database.users.find((user) => user.id === id)!, values)
    },
  }

  return {
    appDataSource: {
      getRepository: (entity: { name: string }) =>
        entity.name === 'User' ? userRepository : personRepository,
      transaction: async (work: (manager: typeof manager) => Promise<unknown>) =>
        work(manager),
    },
  }
})

import { app } from '@/app'
import { UserRole } from '@/entities/enums/user-role'

describe('people routes', () => {
  let professorToken: string

  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(async () => {
    database.users.length = 0
    database.people.length = 0
    database.users.push({
      id: 1,
      username: 'admin@learn.io',
      password: await hash('Senha#123', 8),
      role: UserRole.PROFESSOR,
    })
    professorToken = app.jwt.sign({ role: UserRole.PROFESSOR }, { sub: '1' })
  })

  afterAll(async () => {
    await app.close()
  })

  it('cria um professor com usuário de login vinculado', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/professores',
      headers: { authorization: `Bearer ${professorToken}` },
      payload: { nome: 'Ana', email: 'ana@learn.io', senha: 'Senha#123' },
    })

    expect(response.statusCode).toBe(201)
    expect(database.users).toContainEqual(
      expect.objectContaining({ username: 'ana@learn.io', role: UserRole.PROFESSOR }),
    )
    expect(database.people).toHaveLength(1)
  })

  it('cria um aluno com usuário de login vinculado', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/alunos',
      headers: { authorization: `Bearer ${professorToken}` },
      payload: { nome: 'Bruno', email: 'bruno@learn.io', senha: 'Senha#123', turma: '1A' },
    })

    expect(response.statusCode).toBe(201)
    expect(database.users).toContainEqual(
      expect.objectContaining({ username: 'bruno@learn.io', role: UserRole.ALUNO }),
    )
  })

  it('autentica com as credenciais cadastradas', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/user/signin',
      payload: { username: 'admin@learn.io', password: 'Senha#123' },
    })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({ token: expect.any(String) })
  })

  it('retorna uma mensagem amigável para e-mail já cadastrado', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/alunos',
      headers: { authorization: `Bearer ${professorToken}` },
      payload: { nome: 'Outro', email: 'admin@learn.io', senha: 'Senha#123' },
    })

    expect(response.statusCode).toBe(409)
    expect(response.json()).toEqual({ message: 'Já existe um cadastro com este e-mail.' })
  })
})
