import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import Goal, { InputCreateGoal } from "../entities/goal.entity";
import PlayerService from "./player.service";

export default class GoalService {
  db: Repository<Goal>;
  constructor() {
    this.db = datasource.getRepository(Goal);
  }

  async listGoal() {
    return this.db.find();
  }

  async createGoal({ date, link, playerId }: InputCreateGoal) {
    const playerService = new PlayerService();
    const player = await playerService.getPlayerById(playerId);
    if (!player) { 
        throw new Error (`Player with id ${playerId} not found`)
    }

    const newGoal = this.db.create({ date, link, playerId });
    return await this.db.save(newGoal);
  } 

  async getGoalsByPlayerId(playerId: string) {
    return this.db.find({ where: { playerId } });
  }

}
