import { Request, Response } from "express";
import { getManager, getCustomRepository } from "typeorm";
import { Country } from "../data/entity/country.entity";
import { CountryRepository } from "../data/repository/country.repository";

export async function indexCountry( req: Request, res: Response ): Promise<Response> {
  const countryRepository = getManager().getRepository(Country);
  const countries = await countryRepository.find({ relations: ["users"] });
  return res.status(200).json(countries);
}

export async function testCountry(req: Request, res: Response): Promise<Response> {
  const countryRepository = getCustomRepository(CountryRepository);
  const countries = await countryRepository.test();
  return res.status(200).json(countries);
}

export async function updateCountry(req: Request, res: Response): Promise<Response> {
  const countryRepository = getCustomRepository(CountryRepository);
  const countries = await countryRepository.edit();
  return res.status(200).json(countries);
}