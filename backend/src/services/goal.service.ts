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

  async getNbGoals() {
    const goals = await this.db.find({ select: ["ordre"] });
    return goals.map((goal) => goal.ordre).sort((a, b) => a - b);
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
    saison,
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
      saison,
    });

    return await this.db.save(newGoal);
  }

  async getGoalsBySaison(saison: string) {
    if (saison == "all") {
      return await this.listGoal();
    }
    return this.db.find({ where: { saison } });
  }

  async getGoalsByButeurId(buteurId: string) {
    return this.db.find({ where: { buteurId } });
  }

  async getGoalsByPasseurId(passeurId: string) {
    return this.db.find({ where: { passeurId } });
  }

  async getGoalsByPlayerId(id: string, type: "buteur" | "passeur") {
    const whereCondition =
      type === "buteur" ? { buteurId: id } : { passeurId: id };
    return this.db.find({ where: whereCondition });
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

  private async getTeamAndNbGoalsFromGoals(goals: Goal[]) {
    const teamFrequency: Record<string, number> = {};

    goals.forEach((goal: Goal) => {
      const againstTeam = goal.against;
      if (againstTeam) {
        teamFrequency[againstTeam] = (teamFrequency[againstTeam] || 0) + 1;
      }
    });

    let maxFrequency = 0;
    let mostFrequentTeam = "";

    for (const team in teamFrequency) {
      if (teamFrequency[team] > maxFrequency) {
        maxFrequency = teamFrequency[team];
        mostFrequentTeam = team;
      }
    }

    return { mostFrequentTeam, maxFrequency };
  }

  async getTeamAndNbGoals(saison: string) {
    if (saison == "all") {
      const goals = await this.listGoal();
      return this.getTeamAndNbGoalsFromGoals(goals);
    }

    const goals = await this.getGoalsBySaison(saison);
    return this.getTeamAndNbGoalsFromGoals(goals);
  }

  async getTeamAndNbGoalsForPlayer(id: string, saison: string) {
    if (saison == "all") {
      const goals = await this.getGoalsByButeurId(id);
      return this.getTeamAndNbGoalsFromGoals(goals);
    }

    const goals = await this.getGoalsBySaisonAndPlayerId(saison, id, "buteur");
    return this.getTeamAndNbGoalsFromGoals(goals);
  }

  async getGoalsBySaisonAndPlayerId(
    saison: string,
    id: string,
    type: "buteur" | "passeur"
  ) {
    let whereCondition;
    if (saison === "all") {
      whereCondition = type === "buteur" ? { buteurId: id } : { passeurId: id };
    } else {
      whereCondition =
        type === "buteur"
          ? { buteurId: id, saison }
          : { passeurId: id, saison };
    }
    return this.db.find({ where: whereCondition });
  }
}
