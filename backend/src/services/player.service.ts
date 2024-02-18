import { Repository, FindOneOptions } from "typeorm";
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

  async createPlayer({ name, country }: InputCreatePlayer) {
    const newPlayer = this.db.create({ name, country });
    return await this.db.save(newPlayer);
  }

  async getPlayerById(id: string) {
    const options: FindOneOptions<Player> = {
      where: { id },
    };
    return await this.db.findOne(options);
  }
}