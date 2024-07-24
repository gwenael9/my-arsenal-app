import { Repository, FindOneOptions } from "typeorm";
import datasource from "../lib/datasource";
import Player, { InputCreatePlayer } from "../entities/player.entity";
import GoalService from "./goal.service";
import Goal from "../entities/goal.entity";

export default class PlayerService {
  db: Repository<Player>;
  constructor() {
    this.db = datasource.getRepository(Player);
  }

  async listPlayers() {
    return this.db.find();
  }

  async createPlayer({ firstname, lastname, country }: InputCreatePlayer) {
    const existingPlayer = await this.db.findOne({ where: { lastname } });
    if (existingPlayer) {
      throw new Error(`${lastname} existe déjà !`);
    }
    const newPlayer = this.db.create({ firstname, lastname, country });
    return await this.db.save(newPlayer);
  }

  async getPlayerById(id: string) {
    const options: FindOneOptions<Player> = {
      where: { id },
    };
    return await this.db.findOne(options);
  }

  async getPlayerByName(lastname: string) {
    const options: FindOneOptions<Player> = {
      where: { lastname },
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
