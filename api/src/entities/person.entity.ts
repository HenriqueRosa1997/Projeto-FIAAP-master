import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { IPerson } from './models/person.interface'
import { User } from './user.entity'
import { Address } from './address'
import { Posts } from './posts.entity'

@Entity({ name: 'person' })
export class Person implements IPerson {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id?: number

  @Column({ name: 'cpf', type: 'varchar' })
  cpf: string

  @Column({ name: 'name', type: 'varchar' })
  name: string

  @Column({ name: 'birth', type: 'date' })
  birth: Date

  @Column({ name: 'email', type: 'varchar', unique: true })
  email: string

  @Column({ name: 'class_name', type: 'varchar', nullable: true })
  turma?: string

  @Column({ name: 'specialty', type: 'varchar', nullable: true })
  especialidade?: string

  @OneToOne(() => User, (user) => user.person)
  @JoinColumn({ name: 'user_id' })
  user_id?: number

  @OneToMany(() => Address, (address) => address.person)
  address?: Address

  @OneToMany(() => Posts, (posts) => posts.author_id)
  posts?: Posts[]
}
