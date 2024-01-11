import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import Player, { InputCreatePlayer } from "../entities/player.entity";

export default class PlayerService {
  db: Repository<Player>;
  constructor() {
    this.db = datasource.getRepository(Player);
  }

  async listPlayers() {
    return this.db.find();
  }

  async createPlayer({ name, country, age, number }: InputCreatePlayer) {
    const newPlayer = this.db.create({ name, country, age, number });
    return await this.db.save(newPlayer);
  }
}
