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
    buteurId,
    passeurId,
    against,
    where,
    ordre,
    competition,
  }: InputCreateGoal) {
    const playerService = new PlayerService();
    const buteur = await playerService.getPlayerById(buteurId);
    if (!buteur) {
      throw new Error(`Player with id ${buteurId} not found`);
    }

    let passeurIdToSave: string | null = null;
    if (passeurId) {
      const passeur = await playerService.getPlayerById(passeurId);
      if (!passeur) {
        throw new Error(`Player with id ${passeurId} not found`);
      }
      passeurIdToSave = passeurId;
    }

    const newGoal = this.db.create({
      date,
      link,
      buteurId,
      passeurId: passeurIdToSave as string, 
      against,
      where,
      ordre,
      competition,
    });

    return await this.db.save(newGoal);
  }

  async getGoalsByButeurId(buteurId: string) {
    return this.db.find({ where: { buteurId } });
  }

  async getGoalsByPasseurId(passeurId: string) {
    return this.db.find({ where: { passeurId } });
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
