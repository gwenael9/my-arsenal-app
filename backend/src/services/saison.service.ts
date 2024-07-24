import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import Saison, { InputCreateSaison } from "../entities/saison.entity";

export default class SaisonService {
  db: Repository<Saison>;
  constructor() {
    this.db = datasource.getRepository(Saison);
  }

  async listSaison() {
    return this.db.find();
  }

  async findSaisonByName(name: string) {
    return await this.db.findOneBy({ name });
  }

  async createSaison({ name }: InputCreateSaison) {
    const existingSaison = await this.findSaisonByName(name);
    if (existingSaison) {
        throw new Error(`La saison ${name} est déjà présente.`)
    }
    const newSaison = this.db.create({ name });
    return await this.db.save(newSaison);
  }
}
