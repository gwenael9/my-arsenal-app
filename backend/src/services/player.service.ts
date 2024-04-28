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
    const existingPlayer = await this.db.findOne({ where: { name }});
    if (existingPlayer) {
      throw new Error("Ce joueur existe déjà !");
    }
    const newPlayer = this.db.create({ name, country });
    return await this.db.save(newPlayer);
  }

  async getPlayerById(id: string) {
    const options: FindOneOptions<Player> = {
      where: { id },
    };
    return await this.db.findOne(options);
  }
  
  async getPlayerByName(name: string) {
    const options: FindOneOptions<Player> = {
      where: { name },
    };
    return await this.db.findOne(options);
  }

  async findOnePlayer(id: string) {
    const player = await this.db.findOneBy({ id });
    if (!player) {
      throw new Error("Ce joueur n'existe pas!");
    }
    return player;
  }

  async deletePlayer(id: string) {
    const player = (await this.findOnePlayer(id)) as Player;
    await this.db.remove(player);
    return { ...player, id };
  }
}
