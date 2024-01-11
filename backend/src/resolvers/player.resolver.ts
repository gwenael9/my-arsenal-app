import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Player, { InputCreatePlayer } from "../entities/player.entity";
import PlayerService from "../services/player.service";

@Resolver()
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
}