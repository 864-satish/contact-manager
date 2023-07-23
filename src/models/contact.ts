import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";

export enum LinkPrecedence {
    primary = 'primary',
    secondary = 'secondary'
}

@Entity()
export class Contact extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ nullable: true })
    phoneNumber!: string;

    @Column({ nullable: true })
    email!: string;

    @Column({ nullable: true })
    linkedId?: number;

    @Column({ type: 'enum', enum: LinkPrecedence, nullable: false, default: LinkPrecedence.primary })
    linkPrecedence!: LinkPrecedence;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @Column({ nullable: true })
    deletedAt?: Date;
}
