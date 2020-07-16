import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { type } from "os";

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

    @ManyToOne(type => User, user => user.sessions)
    @JoinColumn([{ name: 'user_id' }, {name: 'email'}])
    user!: User;

    @Column()
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt?: Date;

    @Column()
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt!: Date;

   

}
