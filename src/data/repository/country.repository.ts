import { EntityRepository, Repository } from "typeorm";
import { Country } from "../entity/country.entity";

@EntityRepository(Country)
export class CountryRepository extends Repository<Country> {

    async test() {
        const country = new Country();
        country.name = "polombia";
        country.prefix = "po";
        return this.manager.save(country);;
    }

    async edit() {

        const rawData = await this.manager.query(`SELECT * FROM USERS`);

        const country = await this.findOne();
        country!.name = "colombia";
        return this.manager.save(country);
    }

}