import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateInitialSchema1773400000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE IF NOT EXISTS "user" (id SERIAL PRIMARY KEY, username varchar(258) NOT NULL, password varchar(258) NOT NULL)')
    await queryRunner.query('CREATE TABLE IF NOT EXISTS person (id SERIAL PRIMARY KEY, cpf varchar(11) NOT NULL, name varchar(100) NOT NULL, birth date NOT NULL, email varchar(255) NOT NULL, user_id integer UNIQUE REFERENCES "user"(id))')
    await queryRunner.query('CREATE TABLE IF NOT EXISTS posts (id SERIAL PRIMARY KEY, title varchar(255) NOT NULL, content text NOT NULL, image_url varchar(255) NOT NULL DEFAULT \'\', author_id integer, created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP)')
    await queryRunner.query('CREATE TABLE IF NOT EXISTS address (id SERIAL PRIMARY KEY, street varchar NOT NULL, city varchar NOT NULL, state varchar(2) NOT NULL, zip_code varchar NOT NULL, person_id integer NOT NULL REFERENCES person(id))')
  }
  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS address')
    await queryRunner.query('DROP TABLE IF EXISTS posts')
    await queryRunner.query('DROP TABLE IF EXISTS person')
    await queryRunner.query('DROP TABLE IF EXISTS "user"')
  }
}
