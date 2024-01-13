import { Arg, Mutation, Query, Resolver, FieldResolver, Root } from "type-graphql";
import Goal, { InputCreateGoal } from "../entities/goal.entity";
import GoalService from "../services/goal.service";
import PlayerService from "../services/player.service";
import Player from "../entities/player.entity";

@Resolver(of => Goal)
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
    async player(@Root() goal: Goal) {
        // Utilisez le service PlayerService pour obtenir le joueur associé
        return await new PlayerService().getPlayerById(goal.playerId);
    }
}