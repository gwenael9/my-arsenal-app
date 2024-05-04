import {
  Arg,
  Mutation,
  Query,
  Resolver,
  FieldResolver,
  Root,
  Int,
  Authorized,
} from "type-graphql";
import Goal, { InputCreateGoal } from "../entities/goal.entity";
import GoalService from "../services/goal.service";
import PlayerService from "../services/player.service";
import Player from "../entities/player.entity";
import { GraphQLError } from "graphql";
import { Message } from "../entities/message.entity";

@Resolver((of) => Goal)
export default class GoalResolver {
  // afficher nos goal
  @Query(() => [Goal])
  async goals() {
    return await new GoalService().listGoal();
  }

  // ajouter un goal
  @Mutation(() => Goal)
  async createGoal(@Arg("infos") infos: InputCreateGoal) {
    return await new GoalService().createGoal(infos);
  }

  // Champ résolveur pour obtenir l'ID du joueur associé à un goal
  @FieldResolver(() => Player, { nullable: true })
  async buteur(@Root() goal: Goal) {
    // Utilisez le service PlayerService pour obtenir le joueur associé
    return await new PlayerService().getPlayerById(goal.buteurId);
  }

  // Champ résolveur pour obtenir l'ID du joueur associé à un goal
  @FieldResolver(() => Player, { nullable: true })
  async passeur(@Root() goal: Goal) {
    // Utilisez le service PlayerService pour obtenir le joueur associé
    return await new PlayerService().getPlayerById(goal.passeurId);
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
}
