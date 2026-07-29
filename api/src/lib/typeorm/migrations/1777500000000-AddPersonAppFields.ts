import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddPersonAppFields1777500000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE person ADD COLUMN IF NOT EXISTS class_name varchar')
    await queryRunner.query('ALTER TABLE person ADD COLUMN IF NOT EXISTS specialty varchar')
  }
  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE person DROP COLUMN IF EXISTS specialty')
    await queryRunner.query('ALTER TABLE person DROP COLUMN IF EXISTS class_name')
  }
}
