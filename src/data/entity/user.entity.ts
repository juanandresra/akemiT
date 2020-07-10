import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,JoinColumn, CreateDateColumn, UpdateDateColumn, BeforeUpdate, BeforeInsert } from "typeorm";
import { Country } from "./country.entity";
import * as bcrypt from "bcrypt";
import { Length, IsEmail, ValidationArguments ,  } from "class-validator";
import { __, __l } from "i18n";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;
  
  @Length(3, 5)
  @Column()
  firstName!: string;
  
  @Column()
  lastName!: string;
  
  @Column()
  @IsEmail()
  @Length(10, 20, {
    message: (args: ValidationArguments) => __("Test %s - %t", args.constraints[0], args.constraints[1]),
  })
  email!: string;
  
  @Column()
  password!: string;
  
  @Column()
  country_id!: number;
  
  @Column()
  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt!: Date;
  
  @Column()
  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt!: Date;
  
  @ManyToOne(() => Country, (country) => country.users)
  @JoinColumn({ name: "country_id" })
  country?: Country;
  
  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(): void {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }
  
  checkPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
  
  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
