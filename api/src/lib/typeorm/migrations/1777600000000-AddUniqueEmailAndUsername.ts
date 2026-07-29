import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUniqueEmailAndUsername1777600000000
  implements MigrationInterface
{
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user" ADD CONSTRAINT user_unique_username UNIQUE (username)',
    )
    await queryRunner.query(
      'ALTER TABLE person ADD CONSTRAINT person_unique_email UNIQUE (email)',
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE person DROP CONSTRAINT IF EXISTS person_unique_email',
    )
    await queryRunner.query(
      'ALTER TABLE "user" DROP CONSTRAINT IF EXISTS user_unique_username',
    )
  }
}
