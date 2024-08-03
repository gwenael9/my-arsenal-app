import {
  Arg,
  Mutation,
  Query,
  Resolver,
  FieldResolver,
  Root,
  Authorized,
} from "type-graphql";
import Goal, { AgainstTeam, AllGoalsOrdre, InputCreateGoal } from "../entities/goal.entity";
import GoalService from "../services/goal.service";
import PlayerService from "../services/player.service";
import Player from "../entities/player.entity";
import { Message } from "../entities/message.entity";

@Resolver((of) => Goal)
export default class GoalResolver {
  // afficher nos goal
  @Query(() => [Goal])
  async goals() {
    return await new GoalService().listGoal();
  }

  @Query(() => AllGoalsOrdre)
  async nbGoals() {
    const goals = await new GoalService().getNbGoals();
    return { ordre: goals, total: goals.length };
  }

  // ajouter un goal
  @Authorized(["ADMIN"])
  @Mutation(() => Goal)
  async createGoal(@Arg("infos") infos: InputCreateGoal) {
    const goal = await new GoalService().getGoalByOrdre(infos.ordre);
    if (goal) {
      throw new Error("Ce but a déjà été ajouté!");
    }
    return await new GoalService().createGoal(infos);
  }

  // Champ résolveur pour obtenir l'ID du joueur associé à un goal
  @FieldResolver(() => Player, { nullable: true })
  async buteur(@Root() goal: Goal) {
    return await new PlayerService().getPlayerById(goal.buteurId);
  }

  // Champ résolveur pour obtenir l'ID du joueur associé à un goal
  @FieldResolver(() => Player, { nullable: true })
  async passeur(@Root() goal: Goal) {
    if (goal.passeurId) {
      return await new PlayerService().getPlayerById(goal.passeurId);
    } else {
      return null;
    }
  }

  // trouver le goal selon son ordre
  @Query(() => Goal)
  async getGoalByOrdre(@Arg("goalOrdre") ordre: number) {
    return await new GoalService().getGoalByOrdre(ordre);
  }

  @Authorized(["ADMIN"])
  @Mutation(() => Message)
  async deleteGoal(@Arg("id") id: string) {
    const deletedGoal = await new GoalService().deleteGoal(id);
    const m = new Message();
    m.message = `Le but n°${deletedGoal.ordre} a bien été supprimé.`;
    m.success = true;

    return m;
  }

  // obtenir l'équipe à laquelle on a inscrit le + de buts
  @Query(() => AgainstTeam)
  async getTeamWithMostGoals(
    @Arg("saison") saison: string,
    @Arg("buteurId", { nullable: true }) buteurId?: string
  ) {
    const goals = buteurId
      ? await new GoalService().getTeamAndNbGoalsForPlayer(buteurId, saison)
      : await new GoalService().getTeamAndNbGoals(saison);

    if (goals) {
      const g = new AgainstTeam();
      g.name = goals.mostFrequentTeam;
      g.goals = goals.maxFrequency;
      return g;
    }

    return "";
  }

  @Query(() => [Goal])
  async getGoalsByPlayerId(
    @Arg("playerId") id: string,
    @Arg("type") type: "buteur" | "passeur"
  ) {
    return await new GoalService().getGoalsByPlayerId(id, type);
  }

  @Query(() => [Goal])
  async getGoalsBySaison(@Arg("saison") saison: string) {
    return await new GoalService().getGoalsBySaison(saison);
  }

  @Query(() => [Goal])
  async getGoalsBySaisonAndPlayerId(
    @Arg("saison") saison: string,
    @Arg("playerId") id: string,
    @Arg("type") type: "buteur" | "passeur"
  ) {
    return await new GoalService().getGoalsBySaisonAndPlayerId(
      saison,
      id,
      type
    );
  }
}
