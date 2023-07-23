import { MigrationInterface, QueryRunner } from "typeorm"


/** 
 * @info 
 steps to setup db
 1. https://postgresapp.com/ (donwload and install postgres to create databse server)
 2. psql comands
 3. create databse fluxkartdb
 4. run below migration to create contact table
*/

export class Contacts1689852390437 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "id_generator" START WITH 1 INCREMENT BY 1;`);

        await queryRunner.query(`
            CREATE TABLE contact(
                "id" bigint PRIMARY KEY DEFAULT nextval('"id_generator"'::regclass),
                "phoneNumber" varchar,
                "email" varchar,
                "linkedId" integer,
                "linkPrecedence" varchar NOT NULL DEFAULT 'primary' ,
                "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "deletedAt" TIMESTAMP
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE contact;`);
        await queryRunner.query(`DROP SEQUENCE IF EXISTS "id_generator";`);
    }

}