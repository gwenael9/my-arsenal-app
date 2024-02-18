import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import Player, { InputCreatePlayer } from "../entities/player.entity";
import PlayerService from "../services/player.service";
import Goal from "../entities/goal.entity";
import GoalService from "../services/goal.service";

@Resolver(of => Player)
export default class PlayerResolver {

    // afficher nos players
    @Query(() => [Player])
    async players() {
        return await new PlayerService().listPlayers();
    }

    // ajouter un player
    @Mutation(() => Player)
    async createPlayer(@Arg("infos") infos: InputCreatePlayer) {
        return await new PlayerService().createPlayer(infos);
    }

    // Champ résolveur pour obtenir les goals associés à un joueur
    @FieldResolver(() => [Goal])
    async goals(@Root() player: Player) {
        // Utilisez le service GoalService pour obtenir les goals associés au joueur
        const goals = await new GoalService().getGoalsByPlayerId(player.id);
        return goals || [];
    }

    @Query(() => Player)
    async getPlayerById(@Arg("playerId") playerId: string) {
        return await new PlayerService().getPlayerById(playerId);
    }
}