import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Session {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    active!: number;

    @Column()
    ip!: string;

    @Column()
    hash!: string;

    @Column()
    expireAt!: Date;

    @Column()
    user_id!: number;

    @OneToMany(() => User, (user) => user.sessions)
    @JoinColumn({ name: 'user_id' })

    user!: User;

    @Column()
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt?: Date;

    @Column()
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date;

   

}
