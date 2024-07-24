import {
  Resolver,
  Query,
  FieldResolver,
  Root,
  Mutation,
  Arg,
} from "type-graphql";
import Saison, { InputCreateSaison } from "../entities/saison.entity";
import SaisonService from "../services/saison.service";
import Goal from "../entities/goal.entity";

@Resolver((of) => Saison)
export default class SaisonResolver {
  @Query(() => [Saison])
  async saisons(): Promise<Saison[]> {
    return await new SaisonService().listSaison();
  }

  @FieldResolver(() => Number)
  async goals(@Root() saison: Saison): Promise<number> {
    const goals = await Goal.count({ where: { saison: saison.name } });
    return goals;
  }

  @Mutation(() => Saison)
  async createSaison(@Arg("infos") infos: InputCreateSaison) {
    return await new SaisonService().createSaison(infos);
  }
}
