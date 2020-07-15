import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/user.entity";
import { validate } from "class-validator";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  
  async all() {
    return this.find({ relations: ["country"] });
  }

  async add(user: User) {
    const errors = await validate(user);
    if (errors.length > 0) throw errors;    
    return this.manager.save(user);
  }


}