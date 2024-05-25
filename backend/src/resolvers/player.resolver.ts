import {
  Arg,
  Authorized,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import Player, { InputCreatePlayer } from "../entities/player.entity";
import PlayerService from "../services/player.service";
import Goal from "../entities/goal.entity";
import GoalService from "../services/goal.service";
import { Message } from "../entities/message.entity";

@Resolver((of) => Player)
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
    const goals = await new GoalService().getGoalsByButeurId(player.id);
    return goals || [];
  }

  // Champ résolveur pour obtenir les passes décisives associés à un joueur
  @FieldResolver(() => [Goal])
  async passes(@Root() player: Player) {
    // Utilisez le service GoalService pour obtenir les goals associés au joueur
    const passes = await new GoalService().getGoalsByPasseurId(player.id);
    return passes || [];
  }

  @Query(() => Player)
  async getPlayerById(@Arg("playerId") playerId: string) {
    return await new PlayerService().getPlayerById(playerId);
  }

  @Query(() => Player)
  async getPlayerByName(@Arg("playerName") playerName: string) {
    return await new PlayerService().getPlayerByName(playerName);
  }
  
  @Authorized(["ADMIN"])
  @Mutation(() => Message)
  async deletePlayer(@Arg("id") id: string) {
    const deletedPlayer = await new PlayerService().deletePlayer(id);
    const m = new Message();
    m.message = `${deletedPlayer.lastname} a bien été supprimé.`;
    m.success = true;

    return m;
  }


}
