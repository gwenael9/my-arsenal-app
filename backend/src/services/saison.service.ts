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

  async findSaisonById(id: string) {
    return await this.db.findOneBy({ id });
  }
  
  async findSaisonByName(name: string) {
    return await this.db.findOneBy({ name });
  }

  async createSaison({ name, match }: InputCreateSaison) {
    const existingSaison = await this.findSaisonByName(name);
    if (existingSaison) {
      throw new Error(`La saison ${name} est déjà présente.`);
    }
    const newSaison = this.db.create({ name, match });
    return await this.db.save(newSaison);
  }

  async updateSaisonMatch(saison: Saison, newMatch: number): Promise<Saison> {
    saison.match = newMatch;
    return await saison.save();
  }
}
