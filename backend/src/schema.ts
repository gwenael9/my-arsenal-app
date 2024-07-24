import { buildSchema } from "type-graphql";

import UserResolver from "./resolvers/user.resolver";
import PlayerResolver from "./resolvers/player.resolver";
import GoalResolver from "./resolvers/goal.resolver";
import { customAuthChecker } from "./lib/authChecker";
import SaisonResolver from "./resolvers/saison.resolver";

export default buildSchema({
  resolvers: [PlayerResolver, GoalResolver, UserResolver, SaisonResolver],
  validate: true,
  authChecker: customAuthChecker,
});
