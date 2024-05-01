import { GraphQLError } from "graphql";
import { FindOneOptions, Repository } from "typeorm";
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

  async createGoal({
    date,
    link,
    playerId,
    against,
    where,
    ordre,
  }: InputCreateGoal) {
    const playerService = new PlayerService();
    const player = await playerService.getPlayerById(playerId);
    if (!player) {
      throw new Error(`Player with id ${playerId} not found`);
    }

    const newGoal = this.db.create({
      date,
      link,
      playerId,
      against,
      where,
      ordre,
    });
    return await this.db.save(newGoal);
  }

  async getGoalsByPlayerId(playerId: string) {
    return this.db.find({ where: { playerId } });
  }

  async getGoalByOrdre(ordre: number) {
    const goal: FindOneOptions<Goal> = {
      where: { ordre },
    };
    if (!goal) throw new GraphQLError("introuvable guignolo");
    return await this.db.findOne(goal);
  }

  async findOneGoal(id: string) {
    const goal = await this.db.findOneBy({ id });
    if (!goal) {
      throw new Error("Ce but n'existe pas");
    }
    return goal;
  }

  async deleteGoal(id: string) {
    const goal = await this.findOneGoal(id); 
    await this.db.remove(goal);
    return { ...goal, id };
  }
}
