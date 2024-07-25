import {
  Resolver,
  Query,
  FieldResolver,
  Root,
  Mutation,
  Arg,
  Authorized,
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

  @Query(() => Saison)
  async saisonByName(@Arg("name") name: string): Promise<Saison> {
    const saison = await new SaisonService().findSaisonByName(name);
    if (!saison) {
      throw new Error("Saison introuvable.");
    }
    return saison;
  }

  @FieldResolver(() => Number)
  async goals(@Root() saison: Saison): Promise<number> {
    if (saison.name == "all") {
      return await Goal.count();
    }
    const goals = await Goal.count({ where: { saison: saison.name } });
    return goals;
  }

  @Mutation(() => Saison)
  async createSaison(@Arg("infos") infos: InputCreateSaison) {
    return await new SaisonService().createSaison(infos);
  }

  @Authorized(["ADMIN"])
  @Mutation(() => Saison)
  async updateSaisonMatch(@Arg("saisonId") id: string, @Arg("newMatch") newMatch: number) {
    const saison = await new SaisonService().findSaisonById(id);
    if (!saison) {
      throw new Error("Saison introuvable.");
    }
    return await new SaisonService().updateSaisonMatch(saison, newMatch);
  }
}
