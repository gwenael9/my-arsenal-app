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
    if (newMatch < 0) {
      throw new Error("La valeur doit être positive.");
    }

    // sauvegarder la valeur actuelle de match avant la mise à jour
    const oldMatch = saison.match;

    // met à jour le nombre de match pour la saison spécifiée
    saison.match = newMatch;
    await this.db.save(saison);

    // trouver la saison "all"
    const allSaison = await this.findSaisonByName("all");
    if (!allSaison) {
      throw new Error("Saison 'all' introuvable.");
    }

    const difference = newMatch - oldMatch;

    // Met à jour le nombre de match pour la saison "all"
    allSaison.match += difference;
    await this.db.save(allSaison);

    return saison;
  }
}
